document.addEventListener("DOMContentLoaded", () => {
  // 1) Other toggles
  setupOtherToggles();

  // 2) Maintenance helpers + tier toggle
  const updateMaintenanceUI = setupMaintenanceSupport();

  // 3) Timeline urgency notice
  const updateUrgencyNotice = setupTimelineUrgencyNotice();

  // 4) Autosize textareas
  const resizeAllTextareas = setupAutoResizeTextareas();

  // 5) Progress + save/restore/reset
  setupProgressSaveSystem({
    onAfterApplyData: () => {
      // After restore/reset, update UI states (no re-binding)
      syncOtherDetailsVisibility();
      updateMaintenanceUI?.();
      updateUrgencyNotice?.();
      resizeAllTextareas?.();
    },
  });

  // Ensure UI state is correct on first load too
  syncOtherDetailsVisibility();
  updateMaintenanceUI?.();
  updateUrgencyNotice?.();
  resizeAllTextareas?.();
});

/* -------------------------
   1) "Other" checkbox => textarea toggle
   Requires:
   - .js-other-toggle with aria-controls="textareaId"
   - textarea has .js-other-details + .form__textarea--hidden
------------------------- */
function setupOtherToggles() {
  const toggles = document.querySelectorAll(".js-other-toggle");
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute("aria-controls");
    if (!targetId) return;

    const details = document.getElementById(targetId);
    if (!details) return;

    // Initial state
    details.classList.toggle("form__textarea--hidden", !toggle.checked);
    toggle.setAttribute("aria-expanded", String(toggle.checked));

    toggle.addEventListener("change", () => {
      const isOn = toggle.checked;

      details.classList.toggle("form__textarea--hidden", !isOn);
      toggle.setAttribute("aria-expanded", String(isOn));

      if (isOn) {
        details.focus();
      } else {
        details.value = "";
      }
    });
  });
}

/* Keeps "Other" textareas visible if their toggles are checked.
   Used after restore/reset to sync UI without re-binding listeners. */
function syncOtherDetailsVisibility() {
  const toggles = document.querySelectorAll(".js-other-toggle");
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute("aria-controls");
    if (!targetId) return;

    const details = document.getElementById(targetId);
    if (!details) return;

    const isOn = toggle.checked;
    details.classList.toggle("form__textarea--hidden", !isOn);
    toggle.setAttribute("aria-expanded", String(isOn));
  });
}

/* -------------------------
   2) Maintenance section behavior
   Expected IDs (your HTML):
   - maintenance-support-none
   - maintenance-support-unsure
   - maintenance-support-yes
   - maintenance-no-helper
   - maintenance-unsure-helper
   - maintenance-tier-group
------------------------- */
function setupMaintenanceSupport() {
  const none = document.getElementById("maintenance-support-none");
  const unsure = document.getElementById("maintenance-support-unsure");
  const yes = document.getElementById("maintenance-support-yes");

  const noHelper = document.getElementById("maintenance-no-helper");
  const unsureHelper = document.getElementById("maintenance-unsure-helper");
  const tierGroup = document.getElementById("maintenance-tier-group");

  if (!none || !unsure || !yes || !tierGroup || !noHelper || !unsureHelper) return;

  function updateMaintenanceUI() {
    // Helpers
    noHelper.classList.add("form__notice--hidden");
    unsureHelper.classList.add("form__notice--hidden");

    if (none.checked) noHelper.classList.remove("form__notice--hidden");
    if (unsure.checked) unsureHelper.classList.remove("form__notice--hidden");

    // Tiers
    const showTiers = yes.checked;
    tierGroup.classList.toggle("form__group--hidden", !showTiers);

    if (!showTiers) {
      const tierRadios = tierGroup.querySelectorAll('input[type="radio"]');
      tierRadios.forEach((r) => (r.checked = false));
    }
  }

  [none, unsure, yes].forEach((el) => el.addEventListener("change", updateMaintenanceUI));

  updateMaintenanceUI();
  return updateMaintenanceUI;
}

/* -------------------------
   3) Timeline urgency notice
   Expected IDs:
   - timeline-urgency-expedited
   - timeline-urgency-rush
   - timeline-urgency-standard
   - timeline-urgency-notice
------------------------- */
function setupTimelineUrgencyNotice() {
  const expedited = document.getElementById("timeline-urgency-expedited");
  const rush = document.getElementById("timeline-urgency-rush");
  const standard = document.getElementById("timeline-urgency-standard");
  const notice = document.getElementById("timeline-urgency-notice");

  if (!expedited || !rush || !standard || !notice) return;

  function updateNotice() {
    const showNotice = expedited.checked || rush.checked;
    notice.classList.toggle("form__hint--hidden", !showNotice);
  }

  [standard, expedited, rush].forEach((el) => el.addEventListener("change", updateNotice));

  updateNotice();
  return updateNotice;
}

/* -------------------------
   4) Auto-resize textareas
------------------------- */
function setupAutoResizeTextareas() {
  const textareas = document.querySelectorAll("textarea");
  if (!textareas.length) return;

  function resize(el) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function resizeAll() {
    textareas.forEach((ta) => resize(ta));
  }

  textareas.forEach((ta) => {
    resize(ta);
    ta.addEventListener("input", () => resize(ta));
    ta.addEventListener("focus", () => resize(ta));
  });

  return resizeAll;
}

/* -------------------------
   5) Progress + Save & Continue Later (localStorage)
   HTML IDs used:
   - progressbar-percent
   - progressbar-fill
   - progressbar-section
   - progressbar-saved
   - progressbar-save
   - progressbar-clear
   - progressbar-reset
------------------------- */
function setupProgressSaveSystem({ onAfterApplyData } = {}) {
  const form = document.querySelector(".form");
  if (!form) return;

  const percentEl = document.getElementById("progressbar-percent");
  const fillEl = document.getElementById("progressbar-fill");
  const sectionEl = document.getElementById("progressbar-section");
  const savedEl = document.getElementById("progressbar-saved");
  const saveBtn = document.getElementById("progressbar-save");
  const clearBtn = document.getElementById("progressbar-clear");
  const resetBtn = document.getElementById("progressbar-reset");

  if (!percentEl || !fillEl || !sectionEl || !savedEl || !saveBtn || !clearBtn) return;

  // Keep as-is so don't lose existing saves
  const STORAGE_KEY = "designBrief:v1.4";
  let saveTimer = null;

  const requiredFields = Array.from(form.querySelectorAll("[required]")).filter((el) => el.name);

  function isFilled(el) {
    if (el.type === "radio") {
      const checked = form.querySelector(
        `input[type="radio"][name="${CSS.escape(el.name)}"]:checked`
      );
      return Boolean(checked);
    }
    if (el.type === "checkbox") return el.checked;
    if (el.tagName === "SELECT") return el.value !== "";
    return el.value.trim().length > 0;
  }

  function computeProgress() {
    if (!requiredFields.length) return 0;

    const unique = new Map();
    requiredFields.forEach((el) => {
      if (el.type === "radio") unique.set(el.name, el);
      else unique.set(`${el.name}:${el.id || el.type}`, el);
    });

    const items = Array.from(unique.values());
    const filled = items.reduce((acc, el) => acc + (isFilled(el) ? 1 : 0), 0);
    return Math.round((filled / items.length) * 100);
  }

  function updateProgressUI() {
    const pct = computeProgress();
    percentEl.textContent = `${pct}%`;
    fillEl.style.width = `${pct}%`;
  }

  function updateCurrentSectionLabel() {
    const sections = Array.from(document.querySelectorAll(".form__section"));
    if (!sections.length) return;

    const topOffset = 100;
    let current = sections[0];

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top - topOffset <= 0) current = sec;
    });

    const title = current.querySelector(".form__section-title") || current.querySelector("h2");
    sectionEl.textContent = title ? title.textContent.trim() : "Section";
  }

  function updateActiveSectionClass() {
    const sections = Array.from(document.querySelectorAll(".form__section"));
    if (!sections.length) return;

    const topOffset = 130;
    let current = sections[0];

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top - topOffset <= 0) current = sec;
    });

    sections.forEach((sec) => sec.classList.remove("form__section--active"));
    current.classList.add("form__section--active");
  }

  function serializeForm() {
    const data = {};
    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach((el) => {
      if (!el.name) return;

      if (el.type === "checkbox") {
        data[el.name] = data[el.name] || [];
        if (el.checked) data[el.name].push(el.value);
        return;
      }

      if (el.type === "radio") {
        if (el.checked) data[el.name] = el.value;
        return;
      }

      data[el.name] = el.value;
    });

    return data;
  }

  function applyData(data) {
    if (!data) return;

    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach((el) => {
      if (!el.name) return;

      if (el.type === "checkbox") {
        const arr = data[el.name];
        el.checked = Array.isArray(arr) && arr.includes(el.value);
        return;
      }

      if (el.type === "radio") {
        el.checked = data[el.name] === el.value;
        return;
      }

      if (Object.prototype.hasOwnProperty.call(data, el.name)) {
        el.value = data[el.name];
      }
    });

    onAfterApplyData?.();
  }

  function setSavedStatus(text) {
    savedEl.textContent = text;
  }

  function saveNow() {
    const payload = { savedAt: Date.now(), data: serializeForm() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSavedStatus("Saved");
  }

  function scheduleAutoSave() {
    clearTimeout(saveTimer);
    setSavedStatus("Saving…");
    saveTimer = setTimeout(() => saveNow(), 350);
  }

  function restore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setSavedStatus("Not saved");
      return;
    }

    try {
      const payload = JSON.parse(raw);
      applyData(payload.data);

      const when = payload.savedAt ? new Date(payload.savedAt) : null;
      setSavedStatus(when ? `Restored (${when.toLocaleString()})` : "Restored");
    } catch {
      setSavedStatus("Restore failed");
    }
  }

  // Form change tracking
  form.addEventListener("input", () => {
    scheduleAutoSave();
    updateProgressUI();
  });

  form.addEventListener("change", () => {
    scheduleAutoSave();
    updateProgressUI();
  });

  // Buttons
  saveBtn.addEventListener("click", () => {
    saveNow();
    updateProgressUI();
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedStatus("Cleared");
    updateProgressUI();
  });

  resetBtn?.addEventListener("click", () => {
    const confirmReset = confirm("Are you sure you want to clear all fields and start over?");
    if (!confirmReset) return;

    form.reset();
    localStorage.removeItem(STORAGE_KEY);

    onAfterApplyData?.();

    updateProgressUI();
    updateCurrentSectionLabel();
    updateActiveSectionClass();
    setSavedStatus("Cleared");
  });

  // Scroll tracking
  window.addEventListener(
    "scroll",
    () => {
      updateCurrentSectionLabel();
      updateActiveSectionClass();
    },
    { passive: true }
  );

  // Init
  restore();
  updateProgressUI();
  updateCurrentSectionLabel();
  updateActiveSectionClass();
}