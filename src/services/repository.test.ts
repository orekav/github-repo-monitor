import { getOrganization, getOrganizationRepositories, getOrganizationRepository } from "./repository";
import nock from "nock";
import createHttpError from "http-errors";
import {
  apiRateLimitResponseBody,
  facebookOrganizationSuccessResponseBody,
  notFoundOrganizationResponseBody,
  facebookOrganizationRepositoriesSuccessResponseBody,
  facebookOrganizationRespositoriesSuccessHeaders,
  facebookReactRepositorySuccessResponseBody,
  facebookNotFoundRepositoryResponseBody,
} from "./__mocks__/repository";
import { URL } from "../configs/github.services";


describe("[Service] Repository", () => {

  beforeEach(() => {
    const github = nock(URL);

    github
      .get("/orgs/facebook")
      .reply(200, facebookOrganizationSuccessResponseBody)

    github
      .get("/orgs/notFound")
      .reply(404, notFoundOrganizationResponseBody);

    github
      .get("/orgs/__rateLimit__")
      .reply(403, apiRateLimitResponseBody);

    github
      .get("/orgs/facebook/repos")
      .reply(
        200,
        facebookOrganizationRepositoriesSuccessResponseBody,
        facebookOrganizationRespositoriesSuccessHeaders
      );

    github
      .get("/repos/facebook/react")
      .reply(200, facebookReactRepositorySuccessResponseBody);

    github
      .get("/repos/facebook/notFound")
      .reply(404, facebookNotFoundRepositoryResponseBody);

  });

  it("should return Facebook organization", async () => {
    const organization = await getOrganization("facebook");
    expect(organization).toEqual(facebookOrganizationSuccessResponseBody)
  });

  it("should return not found", async () => {
    await expect(getOrganization("notFound"))
      .rejects
      .toEqual(new createHttpError.NotFound(JSON.stringify(notFoundOrganizationResponseBody)));
  });

  it("should return 'API rate limit exceeded...'", async () => {
    await expect(getOrganization("__rateLimit__"))
      .rejects
      .toEqual(new createHttpError.Forbidden(JSON.stringify(apiRateLimitResponseBody)));
  });

  describe("Get repositories", () => {

    it("should return Facebook first repositories", async () => {
      const { repositories, links } = await getOrganizationRepositories("facebook");
      console.dir(links);
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