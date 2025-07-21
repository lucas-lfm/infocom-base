import './Button.css';

function Button({ children, ...props }) {
  return (
    <button className={props.variant == "outline" ? "btn-default outline": "btn-default"} {...props}>
      {children}
    </button>
  );
}

export default Button;