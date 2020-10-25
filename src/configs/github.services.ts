export const URL = process.env.GITHUB_API_URL || "https://api.github.com";

const username = process.env.GITHUB_USERNAME;
const password = process.env.GITHUB_PASSWORD;

export let authorization = "";
if (username && password) {
  const authString = Buffer.from(`${username}:${password}`).toString("base64");
  authorization = `Basic ${authString}`;
}