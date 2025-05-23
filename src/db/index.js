import Dexie from "dexie";

export const db = new Dexie("BookDB");

db.version(1).stores({
  books: '++id, title, content, updatedAt, syncStatus',
});

