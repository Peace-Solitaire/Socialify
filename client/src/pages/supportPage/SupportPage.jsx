import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSnackbar } from "notistack";

function SupportPage() {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    enqueueSnackbar(
      "We've received your inquiry and will get back to you shortly.",
      { variant: "success" }
    );
  };

  return (
    <Box p={5}>
      <Typography variant="h4" mb={4}>
        Support Page
      </Typography>
      <Typography fontSize="lg" mb={4}>
        Have questions or need help? Check out our FAQ or get in touch with our
        support team.
      </Typography>

      <Typography variant="h5" mb={4}>
        Frequently Asked Questions
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How can I reset my password?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can reset your password by going to the login page and clicking
            on the "Forgot password?" link.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h5" mb={4} mt={4}>
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2}>
          <TextField label="Your name" variant="outlined" required />
          <TextField
            type="email"
            label="Your email"
            variant="outlined"
            required
          />
          <TextareaAutosize
            minRows={3}
            placeholder="Your message"
            style={{ width: "100%" }}
            required
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default SupportPage;
