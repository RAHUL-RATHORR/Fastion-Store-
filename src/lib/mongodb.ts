import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}

const options: MongoClientOptions = {};

if (process.env.MONGODB_TLS_ALLOW_INVALID === "true") {
  options.tlsAllowInvalidCertificates = true;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb(): Promise<Db> {
  const mongoClient = await clientPromise;
  const dbName = process.env.MONGODB_DB_NAME ?? "gilzod";
  return mongoClient.db(dbName);
}
