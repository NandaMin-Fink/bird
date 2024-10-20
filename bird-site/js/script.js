window.onload = function() {
    // Get the grid containers for each section
    const practiceGrid = document.getElementById('grid-container');
    const nonPracticeGrid = document.getElementById('non-practice-grid');
    const weekdayWeekendGrid = document.getElementById('weekday-weekend-grid');

    // Starting and ending dates
    const startDate = new Date("2024-09-17");
    const endDate = new Date("2025-05-20");

    // Break periods
    const thanksgivingWeek = { start: new Date("2024-11-25"), end: new Date("2024-12-01") };
    const winterBreak = { start: new Date("2024-12-19"), end: new Date("2025-01-12") };
    const springBreak = { start: new Date("2025-03-24"), end: new Date("2025-03-29") };

    // List of practice days: Tuesday, Thursday, Friday, Sunday (0 = Sunday, 2 = Tuesday, 4 = Thursday, 5 = Friday)
    const practiceDays = [0, 2, 4, 5];
    const weekdayPracticeDays = [2, 4, 5]; // Tuesday, Thursday, Friday
    const weekendPracticeDays = [0]; // Sunday

    // Helper function to check if a date falls within any break period
    function isDuringBreak(date) {
        return (date >= thanksgivingWeek.start && date <= thanksgivingWeek.end) ||
            (date >= winterBreak.start && date <= winterBreak.end) ||
            (date >= springBreak.start && date <= springBreak.end);
    }

    // Calculate the practice and non-practice days
    let currentDate = new Date(startDate);
    const practiceDates = [];
    const nonPracticeDates = [];
    const weekdayPracticeDates = [];
    const weekendPracticeDates = [];

    while (currentDate <= endDate) {
        if (!isDuringBreak(currentDate)) {
            if (practiceDays.includes(currentDate.getDay())) {
                practiceDates.push(new Date(currentDate)); // Valid practice day
                if (weekdayPracticeDays.includes(currentDate.getDay())) {
                    weekdayPracticeDates.push(new Date(currentDate)); // Weekday practice
                } else {
                    weekendPracticeDates.push(new Date(currentDate)); // Weekend practice
                }
            } else {
                nonPracticeDates.push(new Date(currentDate)); // Non-practice day
            }
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Get today's date
    const today = new Date();

    // --- Graphic 1: All Practice Days ---
    practiceDates.forEach((date, index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('id', `practice-box-${index + 1}`);
        practiceGrid.appendChild(box);

        if (date < today) {
            box.classList.add('red'); // Past practice
        }
    });

    // --- Graphic 2: All Non-Practice Days ---
    nonPracticeDates.forEach((date, index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('id', `non-practice-box-${index + 1}`);
        nonPracticeGrid.appendChild(box);

        if (date >= today) {
            box.style.backgroundColor = 'gold'; // Future non-practice day
        } else {
            box.style.backgroundColor = 'gray'; // Past non-practice day
        }
    });

};
