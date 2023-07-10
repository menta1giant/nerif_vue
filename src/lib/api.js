import axios from "axios"
import { BACKEND_URL } from './config';

export async function apiRequestGet(route, params='') {
  const searchParams = new URLSearchParams(params);

  const { data } = await axios.get(`${ BACKEND_URL }${ route }?${ searchParams }`);

  return data;
}