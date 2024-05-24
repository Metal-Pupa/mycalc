import { ButtonCode } from "../logic/calculate"; /*ReactのライブラリからButtonCodeのコンポーネントをインポート*/

export default function ButtonPanel(props: {
  buttonHandler: (code: ButtonCode) => void;
  /*ButtonPanelの関数コンポーネントを宣言、buttonHandelerにButtonCodeの値を受け取り、何も返さない*/
}) {
  return (
    <div className="buttonPanel">
      {/*クラスの名前をbuttonPanelと定義*/}
      <div>
        <button onClick={() => props.buttonHandler("7")}>7</button>
        {/*7ボタンが押されたらbuttonHandlerに7を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("8")}>8</button>
        {/*8ボタンが押されたらbuttonHandlerに8を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("9")}>9</button>
        {/*9ボタンが押されたらbuttonHandlerに9を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("AC")}>AC</button>
        {/*ACボタンが押されたらbuttonHandlerにACを代入して親コンポーネントに渡す*/}
      </div>
      <div>
        <button onClick={() => props.buttonHandler("4")}>4</button>
        {/*4ボタンが押されたらbuttonHandlerに4を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("5")}>5</button>
        {/*5ボタンが押されたらbuttonHandlerに5を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("6")}>6</button>
        {/*6ボタンが押されたらbuttonHandlerに6を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("-")}>-</button>
        {/*-ボタンが押されたらbuttonHandlerに-を代入して親コンポーネントに渡す*/}
      </div>
      <div>
        <button onClick={() => props.buttonHandler("1")}>1</button>
        {/*1ボタンが押されたらbuttonHandlerに1を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("2")}>2</button>
        {/*2ボタンが押されたらbuttonHandlerに2を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("3")}>3</button>
        {/*3ボタンが押されたらbuttonHandlerに3を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("+")}>+</button>
        {/*+ボタンが押されたらbuttonHandlerに+を代入して親コンポーネントに渡す*/}
      </div>
      <div>
        <button onClick={() => props.buttonHandler("0")}>0</button>
        {/*0ボタンが押されたらbuttonHandlerに0を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler(".")}>.</button>
        {/*.ボタンが押されたらbuttonHandlerに.を代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("Del")}>Del</button>
        {/*Delボタンが押されたらbuttonHandlerにDelを代入して親コンポーネントに渡す*/}
        <button onClick={() => props.buttonHandler("=")}>=</button>
        {/*=ボタンが押されたらbuttonHandlerに=を代入して親コンポーネントに渡す*/}
      </div>
    </div>
  );
}
