import {
  repositoriesCollection,
  findRepository
} from "./repositories";
import { connect } from "../models/index";
import { Collection, MongoClient } from "mongodb";
import { facebookReactRepositorySuccessResponseBody } from "../services/__mocks__/repositories";

describe("[Model] repositories", () => {
  let client: MongoClient;
  let collection: Collection<any>;

  beforeAll(async () => {
    client = await connect();
    collection = await repositoriesCollection;
  });

  afterAll(async () => {
    await client.close();
  });

  it("should get repository from github", async () => {
    const findOne = jest.spyOn(collection, "findOne");
    await findRepository("facebook", "react");

    expect(findOne).toHaveBeenCalledTimes(2);
    expect(findOne).toHaveReturnedWith(Promise.resolve(facebookReactRepositorySuccessResponseBody));
  });
})