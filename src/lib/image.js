import { BACKEND_URL } from '@/lib/config';

export function getImageUrl(relativePath) {
  return `${BACKEND_URL}${relativePath}`;
}