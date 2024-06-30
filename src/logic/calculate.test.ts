import "@testing-library/react";
import { ButtonCode, State, calculate } from "./calculate";

const makeInitState = (): State => {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false,
  };
};

const execCalc = (buttons: ButtonCode[], state: State): State => {
  buttons.forEach((button) => {
    state = calculate(button, state);
  });
  return state;
};

test("12", () => {
  const result = execCalc(["1", "2"], makeInitState());
  expect(result).toMatchObject({
    current: "12",
    operand: 0,
    operator: null,
    isNextClear: false,
  });
});
test("1+2", () => {
  const result = execCalc(["1", "+", "2"], makeInitState());
  expect(result).toMatchObject({
    current: "2",
    operand: 1,
    operator: "+",
    isNextClear: false,
  });
});

test("1+2=", () => {
  const result = execCalc(["1", "+", "2", "="], makeInitState());
  expect(result).toMatchObject({
    current: "3",
    operand: 3,
    operator: null,
    isNextClear: true,
  });
});

test("1-2=", () => {
  const result = execCalc(["1", "-", "2", "="], makeInitState());
  expect(result).toMatchObject({
    current: "-1",
    operand: -1,
    operator: null,
    isNextClear: true,
  });
});

test("1-2-", () => {
  const result = execCalc(["1", "-", "2", "-"], makeInitState());
  expect(result).toMatchObject({
    current: "-1",
    operand: -1,
    operator: "-",
    isNextClear: true,
  });
});

test("clear", () => {
  const clearState = execCalc(["1", "+", "2", "=", "AC"], makeInitState());
  expect(clearState).toEqual({
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false,
  });
});
