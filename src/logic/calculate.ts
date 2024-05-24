export type Operator =
  | "+"
  | "-"; /*Operator型をインポート、Operator型に入るのは+か-の二つ*/
export type NumberCode =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
export type ButtonCode =
  | NumberCode
  | Operator
  | "."
  | "Del"
  | "AC"
  | "="; /*Buttoncode型をインポート、Operator型に入るのはNumberCode～～～＝のどれか*/

export interface State {
  current: string;
  operand: number;
  operator: string | null;
  isNextClear: boolean;
}

export function calculate(button: ButtonCode, currentState: State): State {
  switch (button) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return handleNumberButton(button, currentState);
    case "+":
    case "-":
      return handleOperatorButton(button, currentState);
    case ".":
      return handleDotButton(currentState);
    case "Del":
      return handleDeleteButton(currentState);
    case "AC":
      return handleAllClearButton();
    case "=":
      return handleEqualButton(currentState);
    default:
      return currentState;
  }
}

function handleNumberButton(button: NumberCode, state: State): State {
  /*handleNumberButtonはbutton、stateの引数を受け取る*/
  const { isNextClear, operand, operator, current } =
    state; /*stateオブジェクトからisNextClear, operand, operator, currentの値を取得する*/

  const updatedCurrent = isNextClear
    ? button
    : current === "0"
    ? button
    : current + button;

  return {
    current: updatedCurrent,
    operand,
    operator,
    isNextClear: false,
  };
}

function handleOperatorButton(button: Operator, state: State): State {
  const nextCurrent = state.operator === null ? state.current : operate(state);

  return {
    current: nextCurrent,
    operand: parseFloat(nextCurrent),
    operator: button,
    isNextClear: true,
  };
}

function handleDotButton(state: State): State {
  const nextCurrent =
    state.current.indexOf(".") !== -1 ? state.current : state.current + ".";

  return {
    current: nextCurrent,
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  };
}

function handleDeleteButton(state: State): State {
  const nextCurrent =
    state.current.length === 1
      ? "0"
      : state.current.substring(0, state.current.length - 1);

  return {
    current: nextCurrent,
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  };
}

function handleAllClearButton(): State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false,
  };
}

function handleEqualButton(state: State): State {
  const nextCurrent = state.operator === null ? state.current : operate(state);

  return {
    current: nextCurrent,
    operand: 0,
    operator: null,
    isNextClear: true,
  };
}

function operate(calculation: State): string {
  const current = parseFloat(calculation.current);
  const operand = calculation.operand;
  const operator = calculation.operator;

  switch (operator) {
    case "+":
      return `${operand + current}`;
    case "-":
      return `${operand - current}`;
    default:
      return `${current}`;
  }
}
