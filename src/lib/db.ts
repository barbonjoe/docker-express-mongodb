import { MongoClient, Db } from "mongodb";

let connection: MongoClient | null = null;
let db: Db | null = null;

export function connectAsync(url: string): Promise<Db> {
  return new Promise((resolve, reject) => {
    if (db != null) {
      resolve(db);
    } else {
      MongoClient.connect(
        url,
        { useNewUrlParser: true },
        (err, client) => {
          if (err) {
            reject(err);
          } else {
            connection = client;
            db = connection.db("test");
            // tslint:disable-next-line:no-console
            console.log("Connectd to Mongo.");
            resolve(db);
          }
        }
      );
    }
  });
}

export function getDB() {
  if (db == null) {
    throw new Error("No DB.");
  }
  return db;
}

export function closeAsync() {
  return new Promise((resolve, reject) => {
    if (connection == null) {
      resolve();
    } else {
      connection.close(err => {
        connection = null;
        db = null;

        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });
}
