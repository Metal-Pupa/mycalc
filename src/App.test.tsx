import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Calculator component", () => {
  render(<App />);
  const calculatorElement = screen.getByTestId("calculator");
  expect(calculatorElement).toBeInTheDocument();
});
