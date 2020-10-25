import got, { HTTPError, RequestError } from "got";
import createHttpError from "http-errors";
import { URL, authorization } from "../configs/github.services";

const request = got.extend({
  headers: {
    Authorization: authorization(),
  },
  prefixUrl: URL,
});

const responseErrorCatcher = (error: HTTPError | RequestError) => {
  if (error instanceof HTTPError && [403, 404].includes(error.response.statusCode)) {
    const { statusCode, body } = error.response;
    throw new createHttpError[statusCode](JSON.stringify(body));
  }
  else {
    const returnObject = {
      message: "GitHub is not available"
    };
    throw new createHttpError.ServiceUnavailable(JSON.stringify(returnObject));
  }
};

export const getOrganization = async (organizationName: string) => {
  try {
    const response = await request.get(
      `orgs/${organizationName}`,
      {
        responseType: "json"
      }
    );
    return response.body;
  } catch (error) {
    responseErrorCatcher(error);
  }
};

type paginationLinks = {
  first?: string,
  last?: string,
  prev?: string,
  next?: string,
};

const headerLinkConverter = (aHeaderLink: string): paginationLinks =>
  aHeaderLink.split(", ").map(e => e.split("; "))
    .map(([url, rel]) => ({
      url: url.replace(/\</, "").replace(/\>/, ""),
      rel: rel.replace("rel=", "").replace(/\//g, "").replace(/\"/g, ""),
    }))
    .reduce((acc, link) => ({ ...acc, [link.rel]: link.url }), {});

export const getOrganizationRepositories = async (organizationName: string) => {
  try {
    const { body, headers } = await request.get(
      `orgs/${organizationName}/repos`,
      {
        responseType: "json"
      }
    );

    const links = headers.link ? headerLinkConverter(headers.link as string) : {}

    return {
      repositories: body,
      links
    };
  } catch (error) {
    responseErrorCatcher(error);
  }
};

export const getOrganizationRepository = async (organizationName: string, repositoryName: string) => {
  try {
    const response = await request.get(
      `repos/${organizationName}/${repositoryName}`,
      {
        responseType: "json"
      }
    );
    return response.body;
  } catch (error) {
    responseErrorCatcher(error);
  }
};