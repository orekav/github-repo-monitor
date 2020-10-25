import got from "got";
import createHttpError from "http-errors";

export const getOrganization = async (organizationName: string) => {
  try {
    const response = await got.get(
      `https://api.github.com/orgs/${organizationName}`,
      {
        responseType: "json"
      }
    );
    return response.body;
  } catch (error) {
    const { statusCode, body } = error.response;
    throw new createHttpError[statusCode](JSON.stringify(body));
  }
};