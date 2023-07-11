const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /[A-Za-z0-9]+/;
const PASSWORD_MIN_LENGTH = 6;
const PLAIN_TEXT_REGEX = /\p{L}/u;
const PHONE_REGEX = /^\+\d+$/;

const commonValidators = {
  email: validateEmail,
  password: validatePassword,
  password_confirmation: validatePasswordConfirmation,
  select: validateSelect,
  string: validateString,
  plain_text: validatePlainText,
  phone: validatePhone,
}

export class ValidationRule {
  constructor(validator, errorMessage) {
    this.validator = validator;
    this.errorMessage = errorMessage;
  }
}

export const EMPTY_INPUT_VALIDATION_RULE = new ValidationRule(validateString, 'Fill in the field');

export function validateFields(formData, validationRules = {}) {
  let errorMessages = {};

  function checkValidationRule(rule, key) {
    const validator = rule.validator in commonValidators ? commonValidators[rule.validator] : rule.validator;
  
    const isFieldValid = typeof validator === 'function' ? validator(formData[key], formData) : false;

    if (!isFieldValid) {
      errorMessages[key] = rule.errorMessage;
    }

    return isFieldValid;
  }

  for (const key in formData) {
    if (!(key in validationRules)) continue;
    
    if (validationRules[key] instanceof Array) {
      for (const rule of validationRules[key]) {
        if (!checkValidationRule(rule, key)) break;
      }

      continue;
    }

    checkValidationRule(validationRules[key], key);
  }

  return errorMessages;
}

export function validateEmail(string) {
  return EMAIL_REGEX.test(string);
}

export function validatePassword(password) {
  return PASSWORD_REGEX.test(password) && password.length >= PASSWORD_MIN_LENGTH;
}

export function validatePasswordConfirmation(password, formData) {
  return password === formData.password;
}

export function validateSelect(value) {
  const parsedValue = parseInt(value);
  
  return !isNaN(parsedValue) && typeof parsedValue == 'number'
}

export function validateString(string) {
  return string.length > 0;
}

export function validatePlainText(string) {
  return PLAIN_TEXT_REGEX.test(string);
}

export function validatePhone(phoneString) {
  return PHONE_REGEX.test(phoneString);
}