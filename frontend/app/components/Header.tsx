"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Container } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Blog Posts
            </Link>
          </Typography>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginRight: "20px",
            }}
          >
            Home
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
