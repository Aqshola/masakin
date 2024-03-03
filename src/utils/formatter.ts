export function cleanTextOnlyFromHTML(text: string) {
  return text
    .replace(/\n/g, "")
    .replace(/[0-9.]/g, " ")
    .trimStart();
}
