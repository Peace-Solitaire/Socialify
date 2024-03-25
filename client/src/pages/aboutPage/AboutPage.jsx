import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function AboutPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ py: { xs: 12, md: 24 }, textAlign: "center" }}
    >
      <Stack spacing={5} alignItems="center">
        <Typography variant="h5">
          Thank You for Choosing Login-Template!
        </Typography>
        <Typography>
          I am genuinely excited to see you using my login template. Your trust
          in my solution inspires me to continuously improve and innovate,
          ensuring that you have the best possible experience.
        </Typography>
        <Typography>
          Should you have any feedback or need assistance, please don't hesitate
          to reach out via our{" "}
          <Link
            component={RouterLink}
            to="/support"
            color="teal"
            underline="hover"
          >
            Support Page
          </Link>
          .
        </Typography>
        <Box />
        <Typography variant="caption">
          © {new Date().getFullYear()} Login-Template. All rights reserved.
        </Typography>
      </Stack>
    </Container>
  );
}

export default AboutPage;
