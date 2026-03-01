/* =========================
   Design Brief Form Scripts
   - Robust toggles using aria-controls + hook classes
   - Avoids depending on fragile layout/DOM guessing
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  setupOtherToggles();
  setupMaintenanceSupport();
  setupTimelineUrgencyNotice();
  setupAutoResizeTextareas();
  setupProgressSaveSystem();
});

/* -------------------------
   1) "Other" checkbox => textarea toggle
   Hook classes:
   - .js-other-toggle
   - .js-other-details
   - .form__textarea--hidden
   Preferred pairing:
   - aria-controls="ID_OF_TEXTAREA"
------------------------- */
function setupOtherToggles() {
  const toggles = document.querySelectorAll(".js-other-toggle");
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    const targetId = toggle.getAttribute("aria-controls");
    const details = targetId ? document.getElementById(targetId) : findNearestDetailsForToggle(toggle);

    if (!details) return;

    // Initial state
    details.classList.toggle("form__textarea--hidden", !toggle.checked);

    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        details.classList.remove("form__textarea--hidden");
        details.focus();
      } else {
        details.classList.add("form__textarea--hidden");
        details.value = "";
      }

      // Keep aria-expanded accurate
      toggle.setAttribute("aria-expanded", String(toggle.checked));
    });
  });
}

function findNearestDetailsForToggle(toggle) {
  // Fallback only (for any toggle missing aria-controls)
  const group = toggle.closest(".form__group");
  if (group) {
    const inGroup = group.querySelector(".js-other-details");
    if (inGroup) return inGroup;
  }

  const section = toggle.closest("section") || document;
  return section.querySelector(".js-other-details");
}

/* -------------------------
   2) Maintenance section behavior
   Expected IDs:
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

  // If the section doesn't exist, skip quietly
  if (!none && !unsure && !yes && !tierGroup && !noHelper && !unsureHelper) return;

  function updateMaintenanceUI() {
    // Helpers
    if (noHelper) noHelper.classList.add("form__notice--hidden");
    if (unsureHelper) unsureHelper.classList.add("form__notice--hidden");

    if (none && none.checked && noHelper) {
      noHelper.classList.remove("form__notice--hidden");
    }
    if (unsure && unsure.checked && unsureHelper) {
      unsureHelper.classList.remove("form__notice--hidden");
    }

    // Tiers (shown only when "yes" selected)
    if (tierGroup) {
      const showTiers = yes && yes.checked;
      tierGroup.classList.toggle("form__group--hidden", !showTiers);

      if (!showTiers) {
        const tierRadios = tierGroup.querySelectorAll('input[type="radio"]');
        tierRadios.forEach((r) => (r.checked = false));
      }
    }
  }

  [none, unsure, yes].forEach((el) => {
    if (!el) return;
    el.addEventListener("change", updateMaintenanceUI);
  });

  updateMaintenanceUI();
}

/* -------------------------
   3) Timeline urgency notice
   Expected:
   - timeline-urgency-expedited
   - timeline-urgency-rush
   - timeline-urgency-standard
   - timeline-urgency-notice
   Hidden class in your HTML:
   - .form__hint--hidden
------------------------- */
function setupTimelineUrgencyNotice() {
  const expedited = document.getElementById("timeline-urgency-expedited");
  const rush = document.getElementById("timeline-urgency-rush");
  const standard = document.getElementById("timeline-urgency-standard");
  const notice = document.getElementById("timeline-urgency-notice");

  if (!notice) return;

  function updateNotice() {
    const showNotice = (expedited && expedited.checked) || (rush && rush.checked);
    notice.classList.toggle("form__hint--hidden", !showNotice);
  }

  [standard, expedited, rush].forEach((el) => {
    if (!el) return;
    el.addEventListener("change", updateNotice);
  });

  updateNotice();
}

/* -------------------------
   4) Auto-resize textareas
------------------------- */
function setupAutoResizeTextareas() {
  const textareas = document.querySelectorAll("textarea");

  function resize(el) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  textareas.forEach((ta) => {
    resize(ta);
    ta.addEventListener("input", () => resize(ta));
    ta.addEventListener("focus", () => resize(ta));
  });
}


/* -------------------------
   Progress + Save & Continue Later (localStorage)
   - Fixed progress bar updates while scrolling/typing
   - Saves locally on this device/browser
------------------------- */
function setupProgressSaveSystem() {
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

  const STORAGE_KEY = "designBrief:v1.4";
  let saveTimer = null;

  // Count “completion” using required fields only (practical + predictable)
  const requiredFields = Array.from(form.querySelectorAll("[required]")).filter((el) => el.name);

  function isFilled(el) {
    if (el.type === "radio") {
      const checked = form.querySelector(`input[type="radio"][name="${CSS.escape(el.name)}"]:checked`);
      return Boolean(checked);
    }
    if (el.type === "checkbox") return el.checked;
    if (el.tagName === "SELECT") return el.value !== "";
    return el.value.trim().length > 0;
  }

  function computeProgress() {
    if (!requiredFields.length) return 0;
    const uniqueNames = new Map();

    // group radios by name (count as 1 requirement)
    requiredFields.forEach((el) => {
      if (el.type === "radio") uniqueNames.set(el.name, el);
      else uniqueNames.set(`${el.name}:${el.id || el.type}`, el);
    });

    const items = Array.from(uniqueNames.values());
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

    const topOffset = 100; // accounts for fixed bar
    let current = sections[0];

    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top - topOffset <= 0) current = sec;
    });

    const title = current.querySelector(".form__section-title, h2");
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

    sections.forEach((sec) => 
      sec.classList.remove("form__section--active")
    );
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

    // If "Other" textareas have values, ensure visible
    const otherTextareas = form.querySelectorAll(".js-other-details");
    otherTextareas.forEach((ta) => {
      if (ta.value) ta.classList.remove("form__textarea--hidden");
    });

    // Update helper/conditional UI (your existing setup functions)
    if (typeof setupMaintenanceSupport === "function") setupMaintenanceSupport();
    if (typeof setupTimelineUrgencyNotice === "function") setupTimelineUrgencyNotice();
    if (typeof setupOtherToggles === "function") setupOtherToggles();
    if (typeof setupAutoResizeTextareas === "function") setupAutoResizeTextareas();
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
    saveTimer = setTimeout(() => {
      saveNow();
    }, 350);
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

  // Events
  form.addEventListener("input", () => {
    scheduleAutoSave();
    updateProgressUI();
  });
  form.addEventListener("change", () => {
    scheduleAutoSave();
    updateProgressUI();
  });

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

    //Reset form fields
    form.reset();

    //Clear local storage
    localStorage.removeItem(STORAGE_KEY);

    setupMaintenanceSupport?.();
    setupOtherToggles?.();
    setupTimelineUrgencyNotice?.();


    //Recalculate UI
    updateProgressUI();
    updateCurrentSectionLabel();
    updateActiveSectionClass();

    setSavedStatus("cleared");
  })

  window.addEventListener("scroll",  () => {
    updateCurrentSectionLabel();
    updateActiveSectionClass();
  }, { passive: true });

  // Init
  restore();
  updateProgressUI();
  updateCurrentSectionLabel();
  updateActiveSectionClass();
}