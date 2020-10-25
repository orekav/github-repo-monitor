import { MongoClient } from "mongodb";

export const connection: Promise<MongoClient> = MongoClient.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export const retrieveCollection = async (collectionName: string) => {
  const client = await connection;
  const db = await client.db();
  return await db.collection(collectionName);
};