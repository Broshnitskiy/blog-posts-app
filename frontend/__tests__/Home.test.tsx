import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

describe("Home component", () => {
  it("renders Post List title", async () => {
    await act(async () => {
      render(<Home />);
    });
    expect(screen.getByText("Post List")).toBeInTheDocument();
  });

  it("renders Create New Post button", async () => {
    await act(async () => {
      render(<Home />);
    });
    const button = screen.getByText("Create New Post");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("opens and closes the modal when Create New Post button is clicked", async () => {
    await act(async () => {
      render(<Home />);
    });

    const button = screen.getByText("Create New Post");
    fireEvent.click(button);

    await waitFor(() => {
      const modalBtn = screen.getByText("Submit");
      expect(modalBtn).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      const modalBtn = screen.queryByText("Submit");
      expect(modalBtn).not.toBeInTheDocument();
    });
  });
});
