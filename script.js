const noSchoolList = [
  "2025-05-26", // Memorial Day
  "2025-06-05", // Eid al-Adha
  "2025-06-17",
  "2025-06-18",
  "2025-06-19",
  "2025-06-20",
  "2025-06-23",
  "2025-06-24",
  "2025-06-25",
  "2025-06-26",
];

function isSchoolDay(date, noSchoolDates) {
  const day = date.getDay(); // 0=Sun, 6=Sat
  const dateStr = date.toISOString().split("T")[0];
  return day !== 0 && day !== 6 && !noSchoolDates.includes(dateStr);
}

function updateCountdown() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
  );
  const endDate = new Date("2025-06-26T00:00:00-04:00");
  const timeDiff = endDate - now;

  if (timeDiff <= 0) {
    document.getElementById("live-countdown").textContent =
      "🎉 School's out for summer!";
    document.getElementById("calendar-days").textContent = "";
    document.getElementById("school-days").textContent = "";
    return;
  }

  // Live countdown
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) - 1;
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  document.getElementById("live-countdown").textContent =
    `⏰ Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`;

  // Calendar days left
  document.getElementById("calendar-days").textContent =
    `📅 Calendar Days Left: ${days}`;

  // School days left
  let schoolDays = 0;
  let loopDate = new Date(now);
  loopDate.setDate(loopDate.getDate() + 1); // start from tomorrow
  loopDate.setHours(0, 0, 0, 0); // start at beginning of today
  loopDate.setHours(0, 0, 0, 0);

  while (loopDate <= endDate) {
    if (isSchoolDay(loopDate, noSchoolList)) {
      schoolDays++;
    }
    loopDate.setDate(loopDate.getDate() + 1);
  }

  document.getElementById("school-days").textContent =
    `🏫 School Days Left: ${schoolDays}`;
}

// Initial call and interval for live update
updateCountdown();
setInterval(updateCountdown, 1000);
