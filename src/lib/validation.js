const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function validateEmail(string) {
  return EMAIL_REGEX.test(string);
}