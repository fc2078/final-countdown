document.addEventListener('DOMContentLoaded', () => {
  // Target: June 26, 2025 00:00:00
  const targetDate = new Date(2025, 5, 26);

  // Off days: weekends + specific dates
  const extraOff = [
    '2025-05-26',
    '2025-06-05',
    '2025-06-10',
    '2025-06-11'
  ];
  for (let d = 17; d <= 25; d++) {
    extraOff.push(`2025-06-${String(d).padStart(2, '0')}`);
  }

  function formatYMD(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function isSchoolDay(d) {
    const w = d.getDay();
    if (w === 0 || w === 6) return false;
    if (extraOff.includes(formatYMD(d))) return false;
    return true;
  }

  function calcCalendarDays(now) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = (targetDate - today) / msPerDay;
    return diff > 1 ? Math.floor(diff) - 1 : 0;
  }

  function calcSchoolDays(now) {
    let count = 0;
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let d = new Date(start);
    d.setDate(d.getDate() + 1);
    while (d < targetDate) {
      if (isSchoolDay(d)) count++;
      d.setDate(d.getDate() + 1);
    }
    return count;
  }

  function findNextOff(now) {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let d = new Date(start);
    for (let i = 1; d < targetDate; i++) {
      d = new Date(start);
      d.setDate(d.getDate() + i);
      if (!isSchoolDay(d)) return d;
    }
    return null;
  }

  function update() {
    const now = new Date();
    const cal = calcCalendarDays(now);
    const sch = calcSchoolDays(now);
    document.getElementById('calendar-days').textContent = cal;
    document.getElementById('school-days').textContent = sch;

    // Next day off
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const ndElem = document.getElementById('next-day-off');
    if (!isSchoolDay(todayDate)) {
      ndElem.textContent = 'Today is a day off!';
    } else {
      const nextOff = findNextOff(now);
      if (nextOff) {
        ndElem.textContent = nextOff.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
      } else {
        ndElem.textContent = '';
      }
    }

    // Live timer to targetDate
    const diff = targetDate - now;
    const timerElem = document.getElementById('timer');
    if (diff <= 0) {
      timerElem.textContent = '00:00:00';
      document.getElementById('calendar-days').textContent = 0;
      document.getElementById('school-days').textContent = 0;
      ndElem.textContent = 'The end of hell is here! Enjoy your life!';
      clearInterval(interval);
      return;
    }
    const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const mins = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const secs = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    timerElem.textContent = `${hrs}:${mins}:${secs}`;
  }

  update();
  const interval = setInterval(update, 1000);
});