import { ValidationRule, EMPTY_INPUT_VALIDATION_RULE } from '@/lib/validation';

export const PASSWORD_FORM_VALIDATION_RULES = {
  old_password: new ValidationRule('password', 'Enter valid password. It should contain only letters a-Z and digits 0-9 and be no shorter than 6 characters.'),
  password: new ValidationRule('password', 'Enter valid password. Your password should contain only letters a-Z and digits 0-9 and be no shorter than 6 characters.'),
  password_confirmation: new ValidationRule('password_confirmation', 'Passwords don\'t match'),
};

export const PERSONAL_INFO_FORM_VALIDATION_RULES = {
  first_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your first name may only contain letters')],
  last_name: [EMPTY_INPUT_VALIDATION_RULE, new ValidationRule('plain_text', 'Your last name may only contain letters')],
  phone: new ValidationRule('phone', 'Enter valid phone number. It should start with a \'+\' character followed by any number of digits.'),
  email: new ValidationRule('email', 'Enter valid e-mail'),
};