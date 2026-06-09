import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoOptions(): MongoClientOptions {
  const options: MongoClientOptions = {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  };

  if (process.env.MONGODB_TLS_ALLOW_INVALID === "true") {
    options.tlsAllowInvalidCertificates = true;
  }

  return options;
}

export function resetMongoClient() {
  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise = undefined;
  }
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
