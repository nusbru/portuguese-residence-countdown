/**
 * Email Template Service
 * Handles the generation of email templates for AIMA requests
 * Follows Single Responsibility Principle - handles only email template logic
 */

const EMAIL_SUBJECT = 'Requerimento de entrega do título de residência (renovação – reagrupamento familiar)';

/** Duration in ms for copy feedback message */
export const COPY_FEEDBACK_DURATION_MS = 3000;

/** Interval in ms for countdown refresh */
export const COUNTDOWN_REFRESH_INTERVAL_MS = 60000;

/**
 * Formats a date to Portuguese locale string (e.g., "21 de julho de 2025")
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date in Portuguese
 */
export const formatDateToPortuguese = (dateString) => {
  if (!dateString) return '{{Interview Date}}';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Generates the email template with replaced placeholders
 * @param {Object} data - Email template data
 * @param {string} data.processNumber - The process number
 * @param {string} data.nipc - The NIPC number
 * @param {string} data.name - The applicant's name
 * @param {string} data.contactNumber - The contact number
 * @param {string} data.interviewDate - The interview date in YYYY-MM-DD format
 * @returns {string} - The generated email template
 */
export const generateEmailTemplate = ({ processNumber, nipc, name, contactNumber, interviewDate }) => {
  const formattedDate = formatDateToPortuguese(interviewDate);
  return `Assunto: ${EMAIL_SUBJECT}

Processo número: ${processNumber || '{{Process number}}'}

NIPC: ${nipc || '{{NIPC Number}}'}

Exmos. Senhores,

No dia ${formattedDate}, procedi à renovação do meu título de residência, no âmbito de reagrupamento familiar, tendo igualmente efetuado o pagamento da taxa correspondente, conforme comprovativo em anexo.

Recordo que, tratando-se de uma renovação, é aplicável o n.º 6 e 7 do artigo 82 da Lei n.º 23/2007, de 4 de julho, com as alterações subsequentes, que estabelece:

### 6 — O pedido de renovação de autorização de residência deve ser decidido no prazo de 60 dias.

### 7 — Na falta de decisão no prazo previsto no número anterior, por causa não imputável ao requerente, o pedido entende-se como deferido, sendo a emissão do título de residência imediata.

Até à presente data, já decorreram mais de 60 dias desde a recolha dos dados e pagamento, sem emissão ou entrega do cartão, nem qualquer comunicação por parte dessa Agência, encontrando-se assim ultrapassado o prazo legalmente fixado.

Deste modo, verifica-se que ocorreu o deferimento tácito do meu pedido de renovação, por decurso do prazo sem decisão expressa.

Face ao exposto, e com fundamento nas disposições legais acima referidas, venho requerer a entrega imediata do meu título de residência, uma vez que estão reunidas todas as condições legais para a emissão e entrega do mesmo, não subsistindo fundamento para qualquer demora adicional.

Agradeço que este requerimento seja tratado com caráter de urgência.

Com os melhores cumprimentos,

${name || '{{Name}}'}

Contacto: ${contactNumber || '{{Contact Number}}'}`;
};

/**
 * Validates email template data
 * @param {Object} data - Email template data
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateEmailTemplateData = ({ processNumber, nipc, name, contactNumber }) => {
  const errors = {};

  if (!processNumber || processNumber.trim() === '') {
    errors.processNumber = 'Process number is required';
  }

  if (!nipc || nipc.trim() === '') {
    errors.nipc = 'NIPC is required';
  }

  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!contactNumber || contactNumber.trim() === '') {
    errors.contactNumber = 'Contact number is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Checks if the deadline has expired
 * @param {number} weekDaysLeft - Business days left
 * @returns {boolean} - True if deadline has expired
 */
export const isDeadlineExpired = (weekDaysLeft) => {
  return weekDaysLeft === 0;
};
