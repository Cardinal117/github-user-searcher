import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_API = "https://api.github.com";

// Authorization header with token from .env.
const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
};

// Fetches user details from GitHub API.
export async function fetchUser(username) {
  try {
    const { data } = await axios.get(`${GITHUB_API}/users/${username}`, {
      headers,
    });
    return data;
  } catch (err) {
    if (err.response) {
      err.status = err.response.status;
    }
    throw err;
  }
}

// Fetches last 10 of user's repositories.
export async function fetchUserRepos(username) {
  try {
    const { data } = await axios.get(
      `${GITHUB_API}/users/${username}/repos?per_page=10&sort=updated`,
      { headers }
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch user repos: ${err.message}`);
  }
}

// Fetches last 5 commits by default of a repo.
export async function fetchLastCommits(owner, repo, limit) {
  if (!limit || limit <= 0) {
    console.log("Invalid limit, using last 5 commits as default value.");
    limit = 5;
  }
  if (!owner || !repo) {
    throw new Error(
      "Owner and repo parameters are required, please try again."
    );
  }

  try {
    const { data } = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=${limit}`,
      { headers }
    );
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch commits: ${err.message}`);
  }
}

// Search for users by username and return top 5 results.
export async function searchForUsers(query) {
  try {
    const { data } = await axios.get(
      `${GITHUB_API}/search/users?q=${query}&page=1&per_page=5`,
      { headers }
    );
    return data;
  } catch (err) {
    throw new Error(`Search failed: ${err.message}`);
  }
}
