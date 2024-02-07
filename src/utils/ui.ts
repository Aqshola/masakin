export function getImageUrl(file: File) {
  if (!file) return "";
  return URL.createObjectURL(file);
}

export function isOpenInMobile() {
  if (typeof window == "undefined") return;
  if (!navigator) return;
  const userAgent = navigator.userAgent;
  const regexMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return regexMobile.test(userAgent);
}
