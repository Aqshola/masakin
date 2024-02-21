import { openDB } from "idb";
export const IDB_NAME = "masakin-db";
export const IDB_VERSION = 1;
function supportIndexDB() {
  if (!("indexedDB" in window)) {
    return false;
  }

  return true;
}

async function initDb() {
  const dbLocal = await openDB(IDB_NAME, IDB_VERSION);
  return dbLocal;
}

async function createStoreInDB() {
  const db = await initDb();
  db.createObjectStore("bookmark", { keyPath: "id" });
}
