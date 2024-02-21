import { IDBPDatabase, openDB } from "idb";
export const IDB_NAME = "masakin-db";
export const IDB_VERSION = 1;
export const IDB_STORE_NAME = "masakin-bookmark";

function supportIndexDB() {
  if (!("indexedDB" in window)) {
    return false;
  }

  return true;
}

async function openIDB(
  callbackUpgrade: (db: IDBPDatabase, args?: any) => void = () => {}
) {
  const dbLocal = await openDB(IDB_NAME, IDB_VERSION, {
    upgrade: (db) => {
      callbackUpgrade(db);
    },
  });

  return dbLocal;
}
export async function initDb() {
  const openDB = await openIDB((db: IDBPDatabase) => {
    db.createObjectStore(IDB_STORE_NAME);
  });

  openDB.close();
}

export async function getDataByKeyIDB(key: string) {
  const dbLocal = await openIDB();
  const data = await dbLocal.get(IDB_STORE_NAME, key);

  return data;
}

export async function insertInDB(value: any, key: any) {
  const dbLocal = await openIDB();

  const checkIfExist = await getDataByKeyIDB(key);

  if (checkIfExist) {
    alert("DUPLICATE DATA");
    return;
  }

  dbLocal.add(IDB_STORE_NAME, { ...value, key }, key);
  dbLocal.close();
}

export async function getAllDataIDB() {
  const dbLocal = await openIDB();
  const allData = await dbLocal.getAll(IDB_STORE_NAME);

  return allData;
}
