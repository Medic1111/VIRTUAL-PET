import "./Button.css";

const Button = ({ buttonType, text }) => {
  return (
    <>
      <button className={`button button-${buttonType}`}>{text}</button>
    </>
  );
};

export default Button;
