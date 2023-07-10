import { generateRandomString } from '@/lib/string';

export default {
  props: {
    id: {
      type: String,
      default() {
        return `form-field__${ generateRandomString() }`;
      }
    },
  }
}