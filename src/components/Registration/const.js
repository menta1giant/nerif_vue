import { ValidationRule, EMPTY_INPUT_VALIDATION_RULE } from '@/lib/validation';

export const INITIAL_STEP_VALIDATION_RULES = {
  email: new ValidationRule('email', 'Enter valid e-mail'),
  password: new ValidationRule('password', 'Enter valid password. Your password should contain only letters a-Z and digits 0-9 and be no shorter than 6 characters.'),
  password_confirmation: new ValidationRule('password_confirmation', 'Passwords don\'t match'),
};

export const PAYMENT_STEP_VALIDATION_RULES = {
  subscription_plan: new ValidationRule('select', 'Select subscription plan'),
  default: ['subscription_plan']
};

export const FINAL_STEP_VALIDATION_RULES = {
  first_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your first name may only contain letters')],
  last_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your last name may only contain letters')],
};