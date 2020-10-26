import { MongoClient } from "mongodb";
import App from "../src/app";
import { connect } from "../src/models";

describe("App suite", () => {
  let client: MongoClient;

  beforeAll(async (done) => {
    client = await connect();
    done();
  });

  afterAll(async () => {
    await client.close();
  });

  it("should be truthy", () => {
    expect(App).toBeTruthy();
  });

});
