// Countdown data structure
let countdownData = {
    interviewDate: null,
    weekDaysLimit: 60,
    startDate: null
};

// DOM elements
const setupCard = document.getElementById('setupCard');
const countdownCard = document.getElementById('countdownCard');
const countdownForm = document.getElementById('countdownForm');
const interviewDateInput = document.getElementById('interviewDate');
const weekDaysLimitInput = document.getElementById('weekDaysLimit');

// Countdown display elements
const daysLeftElement = document.getElementById('daysLeft');
const totalDaysElement = document.getElementById('totalDays');
const progressPercentElement = document.getElementById('progressPercent');
const progressFillElement = document.getElementById('progressFill');
const displayInterviewDateElement = document.getElementById('displayInterviewDate');
const expectedDeliveryElement = document.getElementById('expectedDelivery');
const statusTextElement = document.getElementById('statusText');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    updateDisplay();
});

// Setup event listeners
function setupEventListeners() {
    countdownForm.addEventListener('submit', handleFormSubmit);
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    interviewDateInput.value = today;
}

// Portuguese national holidays
function getPortugueseHolidays(year) {
    const holidays = new Set();
    
    // Fixed holidays
    holidays.add(`${year}-01-01`); // Ano Novo
    holidays.add(`${year}-04-25`); // Dia da Liberdade
    holidays.add(`${year}-05-01`); // Dia do Trabalhador
    holidays.add(`${year}-06-10`); // Dia de Portugal
    holidays.add(`${year}-08-15`); // Assunção de Nossa Senhora
    holidays.add(`${year}-10-05`); // Implantação da República
    holidays.add(`${year}-11-01`); // Todos os Santos
    holidays.add(`${year}-12-01`); // Restauração da Independência
    holidays.add(`${year}-12-08`); // Imaculada Conceição
    holidays.add(`${year}-12-25`); // Natal
    
    // Calculate Easter and related holidays
    const easter = calculateEaster(year);
    const carnival = new Date(easter);
    carnival.setDate(easter.getDate() - 47); // 47 days before Easter
    
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2); // Friday before Easter
    
    const corpusChristi = new Date(easter);
    corpusChristi.setDate(easter.getDate() + 60); // 60 days after Easter
    
    holidays.add(formatDateToString(carnival)); // Carnaval (Terça-feira)
    holidays.add(formatDateToString(goodFriday)); // Sexta-feira Santa
    holidays.add(formatDateToString(easter)); // Páscoa
    holidays.add(formatDateToString(corpusChristi)); // Corpo de Deus
    
    return holidays;
}

// Calculate Easter date using the algorithm
function calculateEaster(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n = Math.floor((h + l - 7 * m + 114) / 31);
    const p = (h + l - 7 * m + 114) % 31;
    
    return new Date(year, n - 1, p + 1);
}

// Format date to YYYY-MM-DD string
function formatDateToString(date) {
    return date.toISOString().split('T')[0];
}

// Check if a date is a Portuguese holiday
function isPortugueseHoliday(date) {
    const year = date.getFullYear();
    const holidays = getPortugueseHolidays(year);
    const dateString = formatDateToString(date);
    return holidays.has(dateString);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const interviewDate = interviewDateInput.value;
    const weekDaysLimit = parseInt(weekDaysLimitInput.value);
    
    if (!interviewDate) {
        alert('Please select an interview date');
        return;
    }
    
    if (weekDaysLimit < 1 || weekDaysLimit > 365) {
        alert('Week days limit must be between 1 and 365');
        return;
    }
    
    // Save data
    countdownData.interviewDate = interviewDate;
    countdownData.weekDaysLimit = weekDaysLimit;
    countdownData.startDate = new Date().toISOString();
    
    saveData();
    updateDisplay();
    
    // Show success animation
    const submitBtn = countdownForm.querySelector('button[type="submit"]');
    submitBtn.classList.add('success');
    setTimeout(() => {
        submitBtn.classList.remove('success');
    }, 2000);
}

// Calculate week days between two dates (excluding weekends and Portuguese holidays)
function calculateWeekDays(startDate, endDate) {
    let weekDays = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        // Check if it's not weekend and not a Portuguese holiday
        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isPortugueseHoliday(currentDate)) {
            weekDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return weekDays;
}

// Calculate the expected delivery date
function calculateExpectedDelivery(interviewDate, weekDaysLimit) {
    const startDate = new Date(interviewDate);
    let currentDate = new Date(startDate);
    let weekDaysCount = 0;
    
    while (weekDaysCount < weekDaysLimit) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dayOfWeek = currentDate.getDay();
        // Check if it's not weekend and not a Portuguese holiday
        if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isPortugueseHoliday(currentDate)) {
            weekDaysCount++;
        }
    }
    
    return currentDate;
}

// Update the display
function updateDisplay() {
    if (!countdownData.interviewDate) {
        showSetupCard();
        return;
    }
    
    const today = new Date();
    const interviewDate = new Date(countdownData.interviewDate);
    const expectedDelivery = calculateExpectedDelivery(countdownData.interviewDate, countdownData.weekDaysLimit);
    
    // Calculate week days elapsed and remaining
    const weekDaysElapsed = calculateWeekDays(interviewDate, today);
    const weekDaysLeft = Math.max(0, countdownData.weekDaysLimit - weekDaysElapsed);
    const totalDays = Math.ceil((expectedDelivery - interviewDate) / (1000 * 60 * 60 * 24));
    
    // Calculate progress percentage
    const progressPercent = Math.min(100, Math.max(0, (weekDaysElapsed / countdownData.weekDaysLimit) * 100));
    
    // Update display elements
    daysLeftElement.textContent = weekDaysLeft;
    totalDaysElement.textContent = totalDays;
    progressPercentElement.textContent = Math.round(progressPercent) + '%';
    progressFillElement.style.width = progressPercent + '%';
    
    // Format dates for display
    displayInterviewDateElement.textContent = formatDate(interviewDate);
    expectedDeliveryElement.textContent = formatDate(expectedDelivery);
    
    // Update status
    updateStatus(weekDaysLeft, progressPercent);
    
    // Add animation to updated numbers
    animateNumberUpdate(daysLeftElement);
    animateNumberUpdate(progressPercentElement);
    
    showCountdownCard();
}

// Update status text and color
function updateStatus(weekDaysLeft, progressPercent) {
    let statusText, statusClass;
    
    if (weekDaysLeft === 0) {
        statusText = 'Time limit exceeded';
        statusClass = 'status-expired';
    } else if (weekDaysLeft <= 10) {
        statusText = 'Almost there!';
        statusClass = 'status-warning';
    } else if (progressPercent >= 80) {
        statusText = 'Getting close';
        statusClass = 'status-warning';
    } else {
        statusText = 'In progress';
        statusClass = 'status-active';
    }
    
    statusTextElement.textContent = statusText;
    statusTextElement.className = statusClass;
}

// Format date for display
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Animate number updates
function animateNumberUpdate(element) {
    element.classList.add('updated');
    setTimeout(() => {
        element.classList.remove('updated');
    }, 500);
}

// Show setup card
function showSetupCard() {
    setupCard.style.display = 'block';
    countdownCard.style.display = 'none';
}

// Show countdown card
function showCountdownCard() {
    setupCard.style.display = 'none';
    countdownCard.style.display = 'block';
}

// Edit settings function
function editSettings() {
    if (countdownData.interviewDate) {
        interviewDateInput.value = countdownData.interviewDate;
        weekDaysLimitInput.value = countdownData.weekDaysLimit;
        showSetupCard();
    }
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem('portugueseResidenceCountdown', JSON.stringify(countdownData));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}

// Load data from localStorage
function loadData() {
    try {
        const savedData = localStorage.getItem('portugueseResidenceCountdown');
        if (savedData) {
            countdownData = JSON.parse(savedData);
            
            // Convert string dates back to Date objects if needed
            if (countdownData.interviewDate) {
                // Ensure the date is in the correct format
                const date = new Date(countdownData.interviewDate);
                if (!isNaN(date.getTime())) {
                    countdownData.interviewDate = date.toISOString().split('T')[0];
                }
            }
        }
    } catch (error) {
        console.error('Error loading data from localStorage:', error);
        // Reset to default if there's an error
        countdownData = {
            interviewDate: null,
            weekDaysLimit: 60,
            startDate: null
        };
    }
}

// Update countdown every minute
setInterval(updateDisplay, 60000);

// Export functions for global access
window.editSettings = editSettings; 