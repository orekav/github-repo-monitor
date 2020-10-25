export const URL = process.env.GITHUB_API_URL || "https://api.github.com";


export const authorization = () => {
  const username = process.env.GITHUB_USERNAME;
  const password = process.env.GITHUB_PASSWORD;

  if (username && password) {
    const authString = Buffer.from(`${username}:${password}`).toString("base64");
    return `Basic ${authString}`;
  } else {
    return "";
  }
};