import { getOrganization, getOrganizationRepositories, getOrganizationRepository } from "./repositories";
import createHttpError from "http-errors";
import {
  apiRateLimitResponseBody,
  facebookOrganizationSuccessResponseBody,
  notFoundOrganizationResponseBody,
  facebookOrganizationRepositoriesSuccessResponseBody,
  facebookOrganizationRepositoriesLinks,
  notFoundOrganizationRepositoriesResponseBody,
  facebookReactRepositorySuccessResponseBody,
  facebookNotFoundRepositoryResponseBody,
} from "./__mocks__/repositories";

describe("[Service] Repository", () => {

  it("should return Facebook organization", async () => {
    const organization = await getOrganization("facebook");
    expect(organization).toEqual(facebookOrganizationSuccessResponseBody);
  });

  it("should return not found", async () => {
    await expect(getOrganization("notFound"))
      .rejects
      .toEqual(new createHttpError.NotFound(JSON.stringify(notFoundOrganizationResponseBody)));
  });

  it("shoukd return serviceUnavailable", async () => {
    await expect(getOrganization("__serviceUnavailable__"))
      .rejects
      .toEqual(new createHttpError.ServiceUnavailable(JSON.stringify({ message: "GitHub is not available" })));
  });

  it("should return 'API rate limit exceeded...'", async () => {
    await expect(getOrganization("__rateLimit__"))
      .rejects
      .toEqual(new createHttpError.Forbidden(JSON.stringify(apiRateLimitResponseBody)));
  });

  describe("Get repositories", () => {

    it("should return Facebook first repositories with pagination links", async () => {
      const { repositories, links } = await getOrganizationRepositories("facebook");
      expect(repositories).toEqual(facebookOrganizationRepositoriesSuccessResponseBody);
      expect(links).toEqual(facebookOrganizationRepositoriesLinks);
    });

    it("should return an empty array of repositories and no pagination links", async () => {
      const { repositories, links } = await getOrganizationRepositories("organizationWithoutRepositories");
      expect(repositories).toEqual([]);
      expect(links).toEqual({});
    });

    it("should return organization not found", async () => {
      await expect(getOrganizationRepositories("notFound"))
        .rejects
        .toEqual(new createHttpError.NotFound(JSON.stringify(notFoundOrganizationRepositoriesResponseBody)));
    });

    it("should return Facebook React repository", async () => {
      const repository = await getOrganizationRepository("facebook", "react");
      expect(repository).toEqual(facebookReactRepositorySuccessResponseBody);
    });

    it("should return not found", async () => {
      await expect(getOrganizationRepository("facebook", "notFound"))
        .rejects
        .toEqual(new createHttpError.NotFound(JSON.stringify(facebookNotFoundRepositoryResponseBody)));
    });

  });

})