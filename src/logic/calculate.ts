export function calculate(button: string, state: State) {}

export interface State {
  current: string;
  operand: number;
  operator: string | null;
}
