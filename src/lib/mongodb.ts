import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoOptions(): MongoClientOptions {
  const options: MongoClientOptions = {};

  if (process.env.MONGODB_TLS_ALLOW_INVALID === "true") {
    options.tlsAllowInvalidCertificates = true;
  }

  return options;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Missing environment variable: "MONGODB_URI"');
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, getMongoOptions());
      global._mongoClientPromise = client.connect();
    }

    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri, getMongoOptions());
  return client.connect();
}

export async function getClient(): Promise<MongoClient> {
  return getClientPromise();
}

export async function getDb(): Promise<Db> {
  const mongoClient = await getClientPromise();
  const dbName = process.env.MONGODB_DB_NAME ?? "gilzod";
  return mongoClient.db(dbName);
}
