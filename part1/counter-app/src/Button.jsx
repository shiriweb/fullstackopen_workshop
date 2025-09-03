const Button = ({ onClickFunc, label }) => {
  return <button onClick={onClickFunc}>{label}</button>;
};
export default Button;
