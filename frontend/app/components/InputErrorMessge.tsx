import { Typography } from "@mui/material";
import { FC } from "react";

interface InputErrorMessageProps {
  message: string;
}

const InputErrorMessage: FC<InputErrorMessageProps> = ({ message }) => {
  return (
    <Typography
      variant="body2"
      component="p"
      sx={{
        position: "absolute",
        left: 6,
        bottom: -20,
        fontSize: "12px",
      }}
    >
      {message}
    </Typography>
  );
};

export default InputErrorMessage;
