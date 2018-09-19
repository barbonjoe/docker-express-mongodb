import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let connectedDb = null;

export function connectAsync(url) {
  return new Promise((resolve, reject) => {
    if (connectedDb != null) {
      resolve(connectedDb);
      return;
    }

    MongoClient.connect(
      url,
      (err, db) => {
        if (err) {
          reject(err);
        }

        connectedDb = db;
        resolve(connectedDb);
      }
    );
  });
}

export function get() {
  return connectedDb;
}

export function closeAsync() {
  return new Promise((resolve, reject) => {
    if (connectedDb == null) {
      resolve();
      return;
    }

    connectedDb.close(err => {
      connectedDb = null;

      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
