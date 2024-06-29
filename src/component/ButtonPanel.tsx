import { ButtonCode } from "../logic/calculate";

const buttons = [
  ["7", "8", "9", "AC"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "Del", "="],
];

export default function ButtonPanel(props: {
  buttonHandler: (code: ButtonCode) => void;
}) {
  return (
    <div className="buttonPanel">
      {buttons.map((row, i) => (
        <div key={i}>
          {row.map((button) => (
            <button
              key={button}
              onClick={() => props.buttonHandler(button as ButtonCode)}
            >
              {button}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
