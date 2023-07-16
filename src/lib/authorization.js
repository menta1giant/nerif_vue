import axios from "axios";

export function updateAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${ token }`;
  } else {
    axios.defaults.headers.common['Authorization'] = "";
  }
}