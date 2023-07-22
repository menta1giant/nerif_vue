import { generateRandomString } from '@/lib/string';

export default {
  props: {
    id: {
      type: String,
      default() {
        return `form-field__${ generateRandomString() }`;
      }
    },
    name: {
      type: String,
      default() {
        return 'form-field';
      }
    },
    value: [String, Number, Boolean, File]
  }
}