import React from "react";

interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <button type="button">{props.label}</button>;
};

export default Button;
