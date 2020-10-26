import { retrieveCollection } from "."
import { getOrganizationRepository, getOrganizationRepositories, getOrganization } from "../services/repositories";

export const repositoriesCollection = retrieveCollection("repositories");

export const findOrganization = getOrganization;
export const findRepositories = getOrganizationRepositories;

export const findRepository = async (organizationName: string, repositoryName: string): Promise<any> => {
  const collection = await repositoriesCollection;
  let repository = await collection.findOne({
    "organization.login": organizationName,
    name: repositoryName,
  });

  if (!repository) {
    const aRepository = await getOrganizationRepository(organizationName, repositoryName);
    await collection.insertOne(aRepository);
    return findRepository(organizationName, repositoryName);
  }

  delete repository._id;

  return repository;
};