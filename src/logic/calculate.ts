export type Operator = "+" | "-";

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

/**
 * ButtonCode型は、Buttonのクリックイベントの種類を表す値列挙型です。
 *
 * - NumberCode: 0-9の数字
 * - Operator: +,-の算術演算子
 * - ".": 小数点
 * - "Del": 削除ボタン
 * - "AC": 初期化ボタン
 * - "=": 等号ボタン(計算結果の表示)
 */
export type ButtonCode = NumberCode | Operator | "." | "Del" | "AC" | "=";

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

/**
 * handleNumberButtonは数字ボタンのクリックイベントをハンドリングする。
 *
 * handleNumberButtonには、buttonとstateの2つの引数をとる。
 * buttonはNumberCodeの値であり、クリックされた数字ボタンの値を示す。
 * stateは電卓の現在の状態を保持するオブジェクトである。
 *
 * handleNumberButtonは、buttonボタンをクリックした結果を反映した新しいstateオブジェクトを返す。
 */
function handleNumberButton(button: NumberCode, state: State): State {
  /**
   * stateオブジェクトからisNextClear, operand, operator, currentの値を取得する
   */
  const { isNextClear, operand, operator, current } = state;

  /**
   * isNextClearがtrueの場合は、current値をbutton値に置き換える。
   * これは、演算子ボタンをクリックしてから数字ボタンをクリックした場合の処理である。
   */
  const updatedCurrent = isNextClear
    ? button
    : /**
     * isNextClearがfalseであり、current値が"0"の場合は、current値をbutton値に置き換える。
     * これは、"0"をクリックしてから数字ボタンをクリックした場合の処理である。
     */
    current === "0"
    ? button
    : /**
       * isNextClearがfalseであり、current値が"0"でない場合は、current値とbutton値を連結する。
       */
      current + button;

  /**
   * updatedCurrentを保持する新しいstateオブジェクトを返す。
   * operand, operator, isNextClearはそのまま保持する。
   */
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
