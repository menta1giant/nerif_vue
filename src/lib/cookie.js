import { millisecondsInADay } from './date';

export function setCookie(name, value, expiresInDays) {
  const date = new Date();
  date.setTime(date.getTime() + expiresInDays * millisecondsInADay);

  const expires = `expires=${ date.toUTCString() };`

  document.cookie = `${ name }=${ value };${ expires }path=/`;
}

export function deleteCookie(name) {
  setCookie(name, '', -1);
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}