import express from "express";

import {
  fetchUser,
  fetchUserRepos,
  fetchLastCommits,
  searchForUsers,
} from "./githubDetails.js";

const router = express.Router();

// GET route for searching for users.
router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }

  try {
    // Search for users by username.
    console.log(`Searching for users with query: ${query}`);
    const results = await searchForUsers(query);
    res.json(results);
  } catch (err) {
    console.error("Error in /search route:", err.message);
    res.status(500).json("Could not fetch users from Github API.");
  }
});

// GET route to username to fetch user and return repo details.
router.get("/:username", async (req, res) => {
  try {
    // Fetch username and user repos.
    const username = req.params.username;
    const user = await fetchUser(username);
    const repos = await fetchUserRepos(username);

    // Map all last 5 repos with their details.
    const reposWithCommits = await Promise.all(
      repos.map(async (repo) => {
        const commits = await fetchLastCommits(username, repo.name, 5);
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          created_at: repo.created_at,
          html_url: repo.html_url,
          // Get last commit date or null if not found.
          last_commit_date: commits[0]?.commit.author.date || null,
          commits: commits.map((c) => ({
            message: c.commit.message,
            author: c.commit.author.name,
            date: c.commit.author.date,
          })),
        };
      })
    );

    // Return user and repo details.
    res.json({ user, repos: reposWithCommits });
  } catch (error) {
    // Catch any errors and return a 500 status with the error message.
    if (error.status === 404) {
      return res.status(404).json({ error: "User not found" });
    }
    console.error("GitHub API error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
