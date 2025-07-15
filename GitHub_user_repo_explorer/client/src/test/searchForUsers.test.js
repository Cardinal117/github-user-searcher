import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import SearchForUsers from "../components/searchForUsers";

// Test for SearchForUsers component to see if it is being rendered correctly.
describe("SearchForUsers Component", () => {
  it("renders input and button correctly", () => {
    render(
      <MemoryRouter>
        <SearchForUsers />
      </MemoryRouter>
    );
    // Check if the input and button is in the document.
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("accepts user input: Cardinal117", () => {
    render(
      <MemoryRouter>
        <SearchForUsers />
      </MemoryRouter>
    );
    // Find the input field according to placeholder text and simulate the user adding a value.
    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: "Cardinal117" } });
    expect(input.value).toBe("Cardinal117");
  });

  // Test for loading state to see if it is rendered correctly.
  it("renders loading state correctly", () => {
    render(
      <MemoryRouter>
        <SearchForUsers externalTestLoading={true} />
      </MemoryRouter>
    );
    // Check if loading message appears.
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Test for error state to see if it is rendered correctly.
  it("renders error state correctly", () => {
    render(
      <MemoryRouter>
        <SearchForUsers externalTestError={true} />
      </MemoryRouter>
    );
    // Check if error message appears.
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
