export function getImageUrl(file: File) {
  if (!file) return "";
  const ObjectUrl = URL.createObjectURL(file);
  return URL.createObjectURL(file);
}

export function isOpenInMobile() {
  const userAgent = navigator.userAgent;
  const regexMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return regexMobile.test(userAgent);
}
