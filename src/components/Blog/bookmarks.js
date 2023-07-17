import { getLocalStorageDataByKey, setLocalStorageData } from '@/lib/localStorage';

const BOOKMARKS_STORAGE_KEY = 'blog_bookmarks';

let bookmarks = getLocalStorageDataByKey(BOOKMARKS_STORAGE_KEY);

if (bookmarks) {
  bookmarks = new Set(JSON.parse(bookmarks));
} else {
  bookmarks = new Set();
}

export function toggleBookmark(id) {
  if (bookmarks.has(id)) {
    bookmarks.delete(id);
  } else {
    bookmarks.add(id);
  }

  setLocalStorageData(BOOKMARKS_STORAGE_KEY, JSON.stringify([...bookmarks]));
}

export function getIsPostSaved(id) {
  return bookmarks && bookmarks.has(id);
}