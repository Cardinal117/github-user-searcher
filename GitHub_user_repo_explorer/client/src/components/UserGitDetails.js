import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./gitStyles.css";

export default function UserGitDetails() {
  // Get username from parameters in url.
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetches user data from backend API.
  // Runs as soon as username changes.
  useEffect(() => {
    if (!username) return;

    console.log(`Fetching data for user: ${username}`);

    setLoading(true);
    setError(null);
    setData(null);

    // Fetch user data and handle error if not found.
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/github/${username}`);
        // Check if res is ok else throw error.
        if (!res.ok) throw new Error("User not found");
        const json = await res.json();
        // Set data to JSON data.
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        // Set loading to false after all data is fetched.
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return (
    <div className="card-container">
      <div className="basic-card">
        {/* Display loading or error messages if applicable. */}
        {loading && <p>Loading...</p>}
        {error && <p className="error-text">Error: {error}</p>}

        {/* Only render user info if data and data.user exist. */}
        {data?.user ? (
          <>
            <h1 className="basic-card-header">
              {data.user.name} ({data.user.login})
            </h1>
            {/* User Avatar and alt if not found. */}
            <img
              src={data.user.avatar_url}
              alt={`${data.user.login}'s avatar`}
              className="basic-image"
            />
            <p>Bio: {data.user.bio}</p>
            <p>
              Followers: {data.user.followers} | Following:{" "}
              {data.user.following}
            </p>

            <h3 className="basic-header">Repositories:</h3>
            <div className="basic-card-body">
              <table>
                <thead>
                  <tr>
                    <th>Repository</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Last Commit</th>
                    <th>Last 5 Commits</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map each repo from the user default is last 10. */}
                  {data.repos.map((repo) => (
                    <tr key={repo.id}>
                      <td>
                        <a href={repo.html_url} target="_blank">
                          {repo.name}
                        </a>
                      </td>
                      <td>{repo.description || "No description"}</td>
                      <td>{new Date(repo.created_at).toLocaleDateString()}</td>
                      {/* Check if repo has last commits else display appropriate message. */}
                      <td>
                        {repo.last_commit_date
                          ? new Date(repo.last_commit_date).toLocaleDateString()
                          : "No commits"}
                      </td>
                      <td>
                        <ul className="commit-list">
                          {/* Map each commit details per repo as a list. */}
                          {repo.commits?.map((commit, index) => (
                            <li key={index} className="commit-list-item">
                              {commit.message} — {commit.author} (
                              {new Date(commit.date).toLocaleDateString()})
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
}
