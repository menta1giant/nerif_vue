export const TYPES_MAP = {
  text: {
    type: 'text',
  },
  password: {
    type: 'password',
    icon: 'key',
  },
  search: {
    type: 'text',
    icon: 'search',
    inputmode: 'search',
    autocomplete: true,
  },
  payment: {
    type: 'text',
    icon: 'credit-card',
    inputmode: 'numeric',
    autocomplete: true,
  },
  email: {
    type: 'email',
    inputmode: 'email',
    autocomplete: true,
  },
  tel: {
    type: 'tel',
    inputmode: 'tel',
    autocomplete: true,
  },
}

export function getInputTypes() {
  return Object.keys(TYPES_MAP);
}