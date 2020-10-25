import nock from "nock";
import { URL } from "../src/configs/github.services";
import {
  apiRateLimitResponseBody,
  facebookOrganizationSuccessResponseBody,
  notFoundOrganizationResponseBody,
  facebookOrganizationRepositoriesSuccessResponseBody,
  facebookOrganizationRespositoriesSuccessHeaders,
  notFoundOrganizationRepositoriesResponseBody,
  facebookReactRepositorySuccessResponseBody,
  facebookNotFoundRepositoryResponseBody,
} from "../src/services/__mocks__/repositories";

const github = nock(URL);

github
  .get("/orgs/facebook")
  .reply(200, facebookOrganizationSuccessResponseBody);

github
  .get("/orgs/notFound")
  .reply(404, notFoundOrganizationResponseBody);

github
  .get("/orgs/__rateLimit__")
  .reply(403, apiRateLimitResponseBody);

github
  .get("/orgs/__serviceUnavailable__")
  .replyWithError({});

github
  .get("/orgs/facebook/repos")
  .reply(
    200,
    facebookOrganizationRepositoriesSuccessResponseBody,
    facebookOrganizationRespositoriesSuccessHeaders
  );

github
  .get("/orgs/organizationWithoutRepositories/repos")
  .reply(200, []);

github
  .get("/orgs/notFound/repos")
  .reply(404, notFoundOrganizationRepositoriesResponseBody);

github
  .get("/repos/facebook/react")
  .reply(200, facebookReactRepositorySuccessResponseBody);

github
  .get("/repos/facebook/notFound")
  .reply(404, facebookNotFoundRepositoryResponseBody);
