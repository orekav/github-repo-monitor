import App from "../src/app";

describe("Dummy suite", () => {
  it("should true not to be false", () => {
    expect(true).not.toBe(false);
  });

  it("should Index to be falsy", () => {
    expect(App).toBeFalsy();
  });

});
