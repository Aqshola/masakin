import { Base64 } from "js-base64";

export function setStorageState(data: any, store: string) {
  const parsedData = Base64.encode(JSON.stringify(data));
  localStorage.setItem(store, parsedData);
}

export function getStorageState(store: string) {
  const data = localStorage.getItem(store);
  if (data) {
    const decode = Base64.decode(data);
    return JSON.parse(decode);
  }
  return null;
}

export function clearStorageState(store: string) {
  localStorage.removeItem(store);
}
