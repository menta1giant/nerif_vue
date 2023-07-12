import axios from "axios"
import { BACKEND_URL } from './config';

export async function apiRequestGet(route, params='') {
  const searchParams = new URLSearchParams(params);

  const { data } = await axios.get(`${ BACKEND_URL }${ route }?${ searchParams }`);

  return data;
}

export async function apiRequestPost(route, params={}) {
  const { data } = await axios.post(`${ BACKEND_URL }${ route }`, params);

  return data;
}

const resourcesCache = {

}

export async function fetchResource(resource) {
  if (resource in resourcesCache) return resourcesCache[resource];

  const data = await apiRequestGet(`storage/${ resource }`);

  resourcesCache[resource] = data;

  return data;
}
