import { DEV_BACKEND_URL } from '@/lib/config';

export function getImageUrl(path) {
  return path.startsWith('https') ? path: `${ DEV_BACKEND_URL }${ path }`;
}