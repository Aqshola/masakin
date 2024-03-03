import { IDBPDatabase, openDB } from "idb";

export function isSupportIndexedDB() {
  if (!("indexedDB" in window)) {
    return false;
  }

  return true;
}

export async function openIDB(
  dbName: string,
  dbVersion: number,
  callbackUpgrade: (db: IDBPDatabase, args?: any) => void = () => {}
) {
  const dbLocal = await openDB(dbName, dbVersion, {
    upgrade: (db) => {
      callbackUpgrade(db);
    },
  });

  return dbLocal;
}

export async function initStoreIDB(
  storename: string,
  dbname: string,
  version: number
) {
  const db = await openIDB(dbname, version, (db: IDBPDatabase) => {
    db.createObjectStore(storename);
  });

  return db;
}

export async function getDataByKeyIDB(
  key: string,
  storename: string,
  dbname: string,
  version: number
) {
  const dbLocal = await openIDB(dbname, version);
  const data = await dbLocal.get(storename, key);
  dbLocal.close();

  return data;
}

export async function getAllDataIDB(
  storename: string,
  dbname: string,
  version: number
) {
  const dbLocal = await openIDB(dbname, version);
  const allData = await dbLocal.getAll(storename);
  dbLocal.close();

  return allData || [];
}

export async function deleteKeyIDB(
  key: string,
  storename: string,
  dbname: string,
  version: number
) {
  const dbLocal = await openIDB(dbname, version);
  dbLocal.delete(storename, key);
  dbLocal.close();
}

export async function insertKeyIDB(
  value: any,
  key: string,
  storename: string,
  dbname: string,
  version: number
) {
  const dbLocal = await openIDB(dbname, version);
  dbLocal.add(storename, { ...value, key }, key);
  dbLocal.close();
}
