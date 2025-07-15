import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gitStyles.css";

export default function GitHubUserSearch({ externalTestLoading, externalTestError }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setResults([]);
      // GET request to search for users by username.
      const res = await fetch(`/api/github/search?q=${query}`);
      // Check if res is ok else throw error.
      const data = await res.json();

      // Limit the users to fetch to 5.
      if (data.items) setResults(data.items.slice(0, 5));
      else throw new Error("No users found");
  };

  return (
    <div className="card-container">
      <div className="basic-card">
        <h1 className="basic-card-header">Search GitHub Users:</h1>

        <input
          type="text"
          placeholder="Enter username"
          value={query}
          // Send username to setQuery to search for users.
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {/* Display loading or error messages if applicable. */}
        {externalTestLoading && <h1>Loading...</h1>}
        {externalTestError && <h1 className="error-text">Error: {externalTestError}</h1>}

        {/* Check if fetched results are not empty. */}
        {results.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3 className="basic-header">Select a User:</h3>
            <ul className="github-list">
              {/* Display all users matching search query. */}
              {results.map((user) => (
                <li
                  key={user.id}
                  className="github-list-item basic-link"
                  onClick={() => navigate(`/user/${user.login}`)}
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="github-avatar"
                  />
                  {user.login}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
