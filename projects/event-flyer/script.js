// Copy vendor email button
const copyBtn = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");
const email = "btennis@rogersvillechamber.com";

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = "Email copied to clipboard ✅";
      setTimeout(() => (copyStatus.textContent = ""), 2500);
    } catch {
      copyStatus.textContent = "Couldn’t copy automatically. Please copy manually.";
      setTimeout(() => (copyStatus.textContent = ""), 3000);
    }
  });
}

// Simple “Add to Calendar” link (creates an .ics download)
const calLink = document.getElementById("addToCalendarLink");

if (calLink) {
  calLink.addEventListener("click", (e) => {
    e.preventDefault();

    // NOTE: Time isn't provided, so this is a placeholder 9:00 AM–12:00 PM.
    // You can adjust once you have official hours.
    const title = "Rogersville Pop-Up Market";
    const details = "Bi-weekly community pop-up market. Vendor setup begins 7:30 AM.";
    const location = "Open lot next to O’Reilly Auto Parts, across from Logan-Rogersville Elementary School, Rogersville, MO";
    const start = "20260516T140000Z"; // 9:00 AM Central ≈ 14:00 UTC (approx; DST can affect)
    const end = "20260516T170000Z";   // 12:00 PM Central ≈ 17:00 UTC

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Rogersville Pop-Up Market//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@rogersvillepopupmarket`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "rogersville-pop-up-market.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}
