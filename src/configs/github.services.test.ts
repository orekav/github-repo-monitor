import { authorization } from "./github.services";

describe("[Configs] GitHub Service", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = { ...OLD_ENV };
  });

  it("should return falsy", () => {
    expect(authorization()).toBeFalsy();
  });

  it("should return truthy", () => {
    process.env.GITHUB_USERNAME = "username";
    process.env.GITHUB_PASSWORD = "password";
    expect(authorization()).toBeTruthy();
  });

})