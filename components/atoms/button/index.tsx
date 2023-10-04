import { Button, CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

interface IPropsButton {
  label: string;
  variant?: "outlined" | "contained" | "text";
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullwidth?: boolean;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  handleOnClick: () => void;
  size?: "small" | "medium" | "large";
  colorLoading?: string;
  className?: string;
}

export default function GeneralButton({
  label,
  variant = "contained",
  isLoading,
  isDisabled,
  isFullwidth,
  startIcon,
  endIcon,
  handleOnClick,
  size = "medium",
  colorLoading = "white",
  className,
}: IPropsButton) {
  const buttonClasses = `MuiButton-root ${className || ""}`;
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          text: {
            textTransform: 'none',
            color: 'transparent'
          },
          contained: {
            textTransform: 'none',
            backgroundColor: 'transparent',
          },
          outlined: {
            textTransform: 'none',
            backgroundColor: 'transparent',
          }
        },
      },
    },
  });
  return (
    <div className="">
      <ThemeProvider theme={theme}>
        <Button
          variant={variant}
          disabled={isDisabled}
          startIcon={!isLoading && startIcon}
          endIcon={!isLoading && endIcon}
          onClick={handleOnClick}
          fullWidth={isFullwidth}
          disableElevation
          size={size}
          className={`${buttonClasses} normal-case`}
        >
          {isLoading ? <CircularProgress sx={{ color: colorLoading }} size={25} /> : label}
        </Button>
      </ThemeProvider>
    </div>
  );
}
