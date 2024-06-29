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

test("add", () => {
  const result = execCalc(["1", "+", "2", "="], makeInitState());
  expect(result).toMatchObject({
    current: "3",
    operand: 0,
    operator: null,
    isNextClear: true,
  });
});

test("subtract", () => {
  const result = execCalc(["1", "-", "2", "="], makeInitState());
  expect(result).toMatchObject({
    current: "-1",
    operand: 0,
    operator: null,
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

// 記号を二回連続で押したときのテストコード

test("double operator", () => {
  const result = execCalc(["1", "2", "+", "3", "+", "+", "="], makeInitState());
  expect(result).toMatchObject({
    current: "30",
    operand: 0,
    operator: null,
    isNextClear: true,
  });
});
