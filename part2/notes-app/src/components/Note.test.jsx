import { render, screen } from "@testing-library/react";
import Note from "./Note";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library",
    { exact: false }
  );
  expect(element).toBeDefined();
});

test("does not render this", () => {
  const note = {
    content: "This is a reminder",
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.queryByText("do not want this thing to be rendered");
  expect(element).toBeNull();
});

test("renders content with container", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const { container } = render(<Note note={note} />);

  const div = container.querySelector(".note");
  screen.debug(div);
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = vi.fn();

  render(<Note note={note} updateNote={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("true");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
