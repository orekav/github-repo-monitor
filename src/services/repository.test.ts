import { getOrganization } from "./repository";
import nock from "nock";

describe("[Service] Repository", () => {
  const github = nock("https://api.github.com");
  github
    .get("/orgs/facebook")
    .reply(
      200,
      {
        "login": "facebook",
        "id": 69631,
        "node_id": "MDEyOk9yZ2FuaXphdGlvbjY5NjMx",
        "url": "https://api.github.com/orgs/facebook",
        "repos_url": "https://api.github.com/orgs/facebook/repos",
        "events_url": "https://api.github.com/orgs/facebook/events",
        "hooks_url": "https://api.github.com/orgs/facebook/hooks",
        "issues_url": "https://api.github.com/orgs/facebook/issues",
        "members_url": "https://api.github.com/orgs/facebook/members{/member}",
        "public_members_url": "https://api.github.com/orgs/facebook/public_members{/member}",
        "avatar_url": "https://avatars3.githubusercontent.com/u/69631?v=4",
        "description": "We are working to build community through open source technology. NB: members must have two-factor auth.",
        "name": "Facebook",
        "company": null,
        "blog": "https://opensource.fb.com",
        "location": "Menlo Park, California",
        "email": null,
        "twitter_username": null,
        "is_verified": true,
        "has_organization_projects": true,
        "has_repository_projects": true,
        "public_repos": 124,
        "public_gists": 12,
        "followers": 0,
        "following": 0,
        "html_url": "https://github.com/facebook",
        "created_at": "2009-04-02T03:35:22Z",
        "updated_at": "2020-05-28T20:20:25Z",
        "type": "Organization"
      }
    );

  github
    .get("/orgs/notFound")
    .reply(
      404,
      {
        "message": "Not Found",
        "documentation_url": "https://docs.github.com/rest/reference/orgs#get-an-organization"
      }
    );

  it("should return Facebook organization", async () => {
    const organization = await getOrganization("facebook");
    expect(organization).toHaveProperty("url");
  });

  it("should return not found", async () => {
    await expect(getOrganization("notFound"))
      .rejects
      .toThrowError(JSON.stringify({
        "message": "Not Found",
        "documentation_url": "https://docs.github.com/rest/reference/orgs#get-an-organization"
      }));
  });
})