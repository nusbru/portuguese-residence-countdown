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

// Test the functions
console.log('=== Feriados Portugueses 2025 ===');
const holidays2025 = getPortugueseHolidays(2025);
const sortedHolidays = Array.from(holidays2025).sort();

const holidayNames = {
    '2025-01-01': 'Ano Novo',
    '2025-04-25': 'Dia da Liberdade',
    '2025-05-01': 'Dia do Trabalhador',
    '2025-06-10': 'Dia de Portugal',
    '2025-08-15': 'Assunção de Nossa Senhora',
    '2025-10-05': 'Implantação da República',
    '2025-11-01': 'Todos os Santos',
    '2025-12-01': 'Restauração da Independência',
    '2025-12-08': 'Imaculada Conceição',
    '2025-12-25': 'Natal'
};

sortedHolidays.forEach(holiday => {
    const date = new Date(holiday + 'T00:00:00');
    const dayName = date.toLocaleDateString('pt-PT', { weekday: 'long' });
    const holidayName = holidayNames[holiday] || 'Feriado móvel';
    console.log(`${holiday} (${dayName}) - ${holidayName}`);
});

console.log('\n=== Teste de Cálculo de Dias Úteis ===');
// Test business day calculation around Christmas
const testStart = new Date('2025-12-23'); // Segunda-feira antes do Natal
const testEnd = new Date('2025-12-30');   // Segunda-feira após o Natal

console.log('Período: 23/12/2025 a 30/12/2025');
console.log('Dias úteis (excluindo feriados): ' + calculateWeekDays(testStart, testEnd));

// Test around Easter 2025
const easter2025 = calculateEaster(2025);
console.log('\nPáscoa 2025: ' + formatDateToString(easter2025));

// Test New Year period
const yearStart = new Date('2025-12-30');
const yearEnd = new Date('2026-01-03');
console.log('\nPeríodo: 30/12/2025 a 03/01/2026');
console.log('Dias úteis (excluindo feriados): ' + calculateWeekDays(yearStart, yearEnd));

console.log('\n=== Verificações ===');
console.log('25/12/2025 (Natal) é feriado? ' + isPortugueseHoliday(new Date('2025-12-25')));
console.log('01/01/2026 (Ano Novo) é feriado? ' + isPortugueseHoliday(new Date('2026-01-01')));
console.log('26/12/2025 (dia normal) é feriado? ' + isPortugueseHoliday(new Date('2025-12-26')));
