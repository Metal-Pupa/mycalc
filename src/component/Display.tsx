export default function Display(props: { value: string }) {
  return <div className="display">{props.value}</div>;
}

/*displayという子コンポーネントを定義し、親コンポーネントからString型の値(value)を受け取る*/
