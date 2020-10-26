import { MongoClient } from "mongodb";

export const connect = (): Promise<MongoClient> =>
  MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

export const retrieveCollection = async (collectionName: string) => {
  const client = await connect();
  const db = await client.db();
  return await db.collection(collectionName);
};