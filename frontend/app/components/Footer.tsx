import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <footer
      style={{ marginTop: "auto", backgroundColor: "#f4f4f4", padding: "20px" }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Your Posts. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
