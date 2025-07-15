import { expect } from "chai";
import axios from "axios";

describe("GitHub API Proxy Tests", function () {
  // Test for searching for user using username.
  describe("Search users endpoint", function () {
    it("should return status 200 for a search query", async function () {
      const response = await axios.get(
        "http://localhost:3000/api/github/search?q=Cardinal"
      );
      expect(response.status).to.equal(200);
    });
  });

  describe("Fetch user details", function () {
    it("should return user data for 'Cardinal117'", async function () {
      // Check if status code of response is 200 and contains user data.
      const response = await axios.get(
        "http://localhost:3000/api/github/Cardinal117"
      );
      expect(response.status).to.equal(200);
      expect(JSON.stringify(response.data)).to.include("Cardinal117");
    });

    // Test for fetching user details with invalid username.
    it("should return error for invalid user", async function () {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/github/thisUserShouldNotExist696969"
        );
        throw new Error("Request did not fail as expected");

        // Catch error and handles error codes accordingly.
      } catch (error) {
        expect(error.response.status).to.equal(404);
        expect(error.response.data.error).to.include("User not found");
      }
    });
  });
});
