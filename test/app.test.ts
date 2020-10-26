import App from "../src/app";

describe("App suite", () => {

  beforeAll((done) => {
    // wait MongoDB connection
    done();
  });

  it("should Index to be falsy", () => {
    expect(App).toBeTruthy();
  });

});
