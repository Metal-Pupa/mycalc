export function calculate(button: string, state: State): State {
  if (isNumberButton(button)) {
    return handleNumberButton(button, state);
  }
  if (isOperatorButton(button)) {
    return handleOperatorButton(button, state);
  }
  if (isDotButton(button)) {
    return handleDotButton(state);
  }
  if (isDeleteButton(button)) {
    return handleDeleteButton(state);
  }
  if (isAllClearButton(button)) {
    return handleAllClearButton();
  }
  if (isEqualButton(button)) {
    return handleEqualButton(state);
  }
  return state;
}

export interface State {
  current: string;
  operand: number;
  operator: string | null;
  isNextClear: boolean;
}

function isNumberButton(button: string) {
  return (
    button === "0" ||
    button === "1" ||
    button === "2" ||
    button === "3" ||
    button === "4" ||
    button === "5" ||
    button === "6" ||
    button === "7" ||
    button === "8" ||
    button === "9"
  );
}

function handleNumberButton(button: string, state: State): State {
  if (state.isNextClear) {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false,
    };
  }
  if (state.current === "0") {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextClear: false,
    };
  }
  return {
    current: state.current + button,
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  };
}

function isOperatorButton(button: string) {
  return button === "+" || button === "-";
}

function handleOperatorButton(button: string, state: State): State {
  if (state.operator === null) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      isNextClear: true,
    };
  }
  const nextValue = operate(state);
  return {
    current: nextValue,
    operand: parseFloat(nextValue),
    operator: button,
    isNextClear: true,
  };
}

function isDotButton(button: string) {
  return button === ".";
}

function handleDotButton(state: State): State {
  if (state.current.indexOf(".") !== -1) {
    return state;
  }
  return {
    current: state.current + ".",
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  };
}

function isDeleteButton(button: string) {
  return button === "Del";
}

function handleDeleteButton(state: State): State {
  if (state.current.length === 1) {
    return {
      current: "0",
      operand: state.operand,
      operator: state.operator,
      isNextClear: false,
    };
  }
  return {
    current: state.current.substring(0, state.current.length - 1),
    operand: state.operand,
    operator: state.operator,
    isNextClear: false,
  };
}

function isAllClearButton(button: string) {
  return button === "AC";
}

function handleAllClearButton(): State {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false,
  };
}

function isEqualButton(button: string) {
  return button === "=";
}

function handleEqualButton(state: State): State {
  if (state.operator === null) {
    return state;
  }
  const nextValue = operate(state);
  return {
    current: nextValue,
    operand: 0,
    operator: null,
    isNextClear: true,
  };
}

function operate(state: State): string {
  const current = parseFloat(state.current);
  if (state.operator === "+") {
    return `${state.operand + current}`;
  }
  if (state.operator === "-") {
    return `${state.operand - current}`;
  }
  return `${current}`;
}
