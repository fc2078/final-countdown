function isSchoolDay(date, noSchoolDates) {
    const day = date.getDay(); // 0=Sun, 6=Sat
    const dateStr = date.toISOString().split("T")[0];
    return day !== 0 && day !== 6 && !noSchoolDates.includes(dateStr);
}

function updateCountdown() {
    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    const endDate = new Date("2025-06-26T00:00:00-04:00");

    // Calendar day countdown
    const diffTime = endDate - today;
    const calendarDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    document.getElementById("calendar-days").textContent =
        `📅 Calendar Days Left: ${calendarDays}`;

    // School day countdown
    const noSchoolList = [
        "2025-05-26", // Memorial Day
        "2025-06-05", // Eid al-Adha
        "2025-06-17", "2025-06-18", "2025-06-19", "2025-06-20",
        "2025-06-23", "2025-06-24", "2025-06-25", "2025-06-26"
    ];

    let schoolDays = 0;
    let loopDate = new Date(today);

    while (loopDate <= endDate) {
        const dateStr = loopDate.toISOString().split("T")[0];
        if (isSchoolDay(loopDate, noSchoolList)) {
            schoolDays++;
        }
        loopDate.setDate(loopDate.getDate() + 1);
    }

    document.getElementById("school-days").textContent =
        `🏫 School Days Left: ${schoolDays}`;
}

updateCountdown();