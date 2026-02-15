const otherToggle = document.getElementById("integration-other-toggle");
const otherDetails = document.getElementById("integration-other-details");

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function syncOtherVisibility() {
  const isOn = otherToggle.checked;
  otherDetails.style.display = isOn ? "block" : "none";

  if (!isOn) {
    otherDetails.value = "";
    otherDetails.style.height = "auto";
  } else {
    autoResize(otherDetails);
    otherDetails.focus();
  }
}

otherToggle.addEventListener("change", syncOtherVisibility);
otherDetails.addEventListener("input", () => autoResize(otherDetails));

syncOtherVisibility();

