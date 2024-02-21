import { openDB } from "idb";
export const IDB_NAME = "masakin-db";
export const IDB_VERSION = 1;
export const IDB_STORE_NAME='masakin-bookmark'

function supportIndexDB() {
  if (!("indexedDB" in window)) {
    return false;
  }

  return true;
}

export async function initDb() {
  const dbLocal = await openDB(IDB_NAME, IDB_VERSION,{
    upgrade(db){
      db.createObjectStore(IDB_STORE_NAME,{
        autoIncrement:true
      })
      console.log("lcalle")
    }
  });
  return dbLocal;
}
async function insertInDB(){

}
