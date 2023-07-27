import axios from "axios";
import { notify } from '@/lib/notify';
import { getLocalStorageDataByKey, setLocalStorageData } from '@/lib/localStorage';
import store from '../store';

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
      url: `${ '/api/v1/' }${ url }`,
      data: params,
      headers,
    })
    
    if (data.message) notify.success(data.message);

    return data;
  } catch(e) {
    if (e.response.data.detail === 'Invalid token.') {
      store.commit('removeToken');
      
      const { data } = await axios({
        method,
        url,
        data: params,
        headers,
      })
      
      if (data.message) notify.success(data.message);
  
      return data;
    }

    if (e.response.data.message) notify.error(e.response.data.message);

    if (errorCallback) {
      errorCallback(e.response.data)
    }
    throw e;
  }
}

export async function apiRequestGetWithCache(route, { errorCallback = null, cacheProp = null } = {}) {
  if (resourcesCache[cacheProp]) return resourcesCache[cacheProp];

  const data = await apiRequestGet(route, '', { errorCallback });

  resourcesCache[cacheProp] = data;

  return data;
}

export async function apiRequestGet(route, params='', { errorCallback = null } = {}) {

  const searchParams = new URLSearchParams(params);

  const url = `${ route }?${ searchParams }`;
  const data = apiRequest({method: 'GET', url, errorCallback});

  return data;
}

export async function apiRequestPostForm(route, params={}, errorCallback = null) {
  const data = apiRequest({method: 'POST', url: route, params, errorCallback, headers: {
    'Content-Type': 'multipart/form-data'
  }})

  return data;
}

export async function apiRequestPost(route, params={}, errorCallback = null) {
  const data = apiRequest({method: 'POST', url: route, params, errorCallback})

  return data;
}

const resourcesCache = {}

export async function fetchResource(resource) {
  if (resource in resourcesCache) return resourcesCache[resource];

  const resourceInStorage = getLocalStorageDataByKey(`resource_${ resource }`);
    if (resourceInStorage) {
      resourcesCache[resource] = JSON.parse(resourceInStorage);
      return resourcesCache[resource];
    }

  const data = await apiRequestGetWithCache(`storage/${ resource }`, { cacheProp: resource });

  setLocalStorageData(`resource_${ resource }`, JSON.stringify(data));

  return data;
}
