import { Box, Modal } from "@mui/material";
import { FC, ReactNode } from "react";

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "95%",
  maxWidth: 400,
  "@media (min-width:768px)": {
    width: 440,
  },
};

const CustomModal: FC<CustomModalProps> = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
