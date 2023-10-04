import React, { ChangeEvent, KeyboardEvent } from 'react';
import TextField from "@mui/material/TextField";

interface InputFormProps {
  label: string;
  variant?: 'outlined' | 'filled' | 'standard';
  type?: 'text' | 'number' | 'email' | 'password';
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: any;
  propsInput?: object;
  isError?: boolean;
  infoText?: string;
  onKeyUp?: () => void;
  className?: string;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  variant = "outlined",
  type = "text",
  size = "medium",
  isDisabled,
  handleOnChange,
  name,
  value,
  propsInput,
  isError,
  infoText,
  onKeyUp,
  className,
}) => {
  const handleOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onKeyUp) {
      onKeyUp();
    }
  };
  const textFieldClasses = `MuiTextField-root ${className || ""}`;
  return (
      <TextField
        value={value}
        name={name}
        id={name}
        label={label}
        variant={variant}
        type={type}
        className={textFieldClasses}
        size={size}
        disabled={isDisabled}
        onChange={handleOnChange}
        InputProps={{ ...propsInput }}
        error={isError}
        helperText={infoText}
        onKeyUp={handleOnKeyUp}
      />
  );
};

export default InputForm;
