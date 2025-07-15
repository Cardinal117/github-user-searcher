import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserGitDetails from "../components/UserGitDetails";

// Test for UserGitDetails component to see if it is being rendered correctly.
describe("UserGitDetails Component", () => {
  it("renders component with default state", () => {
    render(<UserGitDetails />);
    expect(screen.getByText(/no user data/i)).toBeInTheDocument();
  });
});
