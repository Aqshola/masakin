import { Base64 } from "js-base64";

const STORAGE_NAME = "masakin-state";

export function setStorageState(data: any) {
  const parsedData = Base64.encode(JSON.stringify(data));
  localStorage.setItem(STORAGE_NAME, parsedData);
}

export function getStorageState() {
  const data = localStorage.getItem(STORAGE_NAME);
  if (data) {
    const decode = Base64.decode(data);
    return JSON.parse(decode);
  }
  return null;
}

export function clearStorageState() {
  localStorage.removeItem(STORAGE_NAME);
}
