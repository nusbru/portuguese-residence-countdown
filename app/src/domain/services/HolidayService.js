/**
 * Calculates Easter date using the Anonymous Gregorian algorithm
 * @param {number} year - The year to calculate Easter for
 * @returns {Date} - Easter date
 */
export const calculateEaster = (year) => {
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
};

/**
 * Formats a date to YYYY-MM-DD string
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDateToString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Gets all Portuguese national holidays for a given year
 * @param {number} year - The year to get holidays for
 * @returns {Set<string>} - Set of holiday dates in YYYY-MM-DD format
 */
export const getPortugueseHolidays = (year) => {
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
};

/**
 * Checks if a date is a Portuguese holiday
 * @param {Date} date - The date to check
 * @returns {boolean} - True if the date is a holiday
 */
export const isPortugueseHoliday = (date) => {
  const year = date.getFullYear();
  const holidays = getPortugueseHolidays(year);
  const dateString = formatDateToString(date);
  return holidays.has(dateString);
};

/**
 * Checks if a date is a weekend day
 * @param {Date} date - The date to check
 * @returns {boolean} - True if the date is a weekend
 */
export const isWeekend = (date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
};

/**
 * Checks if a date is a business day (not weekend and not holiday)
 * @param {Date} date - The date to check
 * @returns {boolean} - True if the date is a business day
 */
export const isBusinessDay = (date) => {
  return !isWeekend(date) && !isPortugueseHoliday(date);
};
