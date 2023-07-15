import axios from "axios"
import { BACKEND_URL_API } from './config';
import { notify } from '@/lib/notify';

async function apiRequest({
  method = 'GET',
  url = '',
  params = '',
  errorCallback = null,
  headers = {},
}) {
  try {
    const { data } = await axios({
      method,
      url,
      data: params,
      headers,
    })
    
    if (data.message) notify.success(data.message);

    return data;
  } catch(e) {
    if (errorCallback) {
      if (e.response.data.message) notify.error(e.response.data.message);
      errorCallback(e.response.data)
    }
    throw e;
  }
}

export async function apiRequestGet(route, params='', errorCallback = null) {
  const searchParams = new URLSearchParams(params);

  const url =  `${ BACKEND_URL_API }${ route }?${ searchParams }`;

  const data = apiRequest({method: 'GET', url, errorCallback})

  return data;
}

export async function apiRequestPostForm(route, params={}, errorCallback = null) {
  const url =  `${ BACKEND_URL_API }${ route }`;

  const data = apiRequest({method: 'POST', url, params, errorCallback, headers: {
    'Content-Type': 'multipart/form-data'
  }})

  return data;
}

export async function apiRequestPost(route, params={}, errorCallback = null) {
  const url =  `${ BACKEND_URL_API }${ route }`;

  const data = apiRequest({method: 'POST', url, params, errorCallback})

  return data;
}

const resourcesCache = {}

export async function fetchResource(resource) {
  if (resource in resourcesCache) return resourcesCache[resource];

  const data = await apiRequestGet(`storage/${ resource }`);

  resourcesCache[resource] = data;

  return data;
}
