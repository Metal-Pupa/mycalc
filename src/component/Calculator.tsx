import { useState } from "react";
import { ButtonCode, State, calculate } from "../logic/calculate";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import "./Calculator.scss";

export default function Calculator() {
  const [state, setState] = useState<State>({
    current: "0",
    operand: 0,
    operator: null,
    isNextClear: false,
  });
  const buttonHandler = (code: ButtonCode) => {
    const nextState = calculate(code, state);
    setState(nextState);
  };
  return (
    <div className="calculator" data-testid="calculator">
      <Display value={state.current} />
      <ButtonPanel buttonHandler={buttonHandler} />
    </div>
  );
}
