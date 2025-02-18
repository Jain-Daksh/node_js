import React from "react";
import Header from "common/components/Header";
import { userName } from "common/components/UserRole";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
const Benefits = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  console.log('userName', userName)
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="My Benefits" />

      <h3 style={{ color: 'green' }}>Welcome, {userName}</h3>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="360px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 1"
          gridRow="span 1"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Unlimited Consultations per Month, Unlimited GP consultations for you and your family members, GP consultation via Audio/Video Call or Chat, Maintain your Personal Medical Record for Free. Access to Diagnostic Services.
          </Typography>
        </Box>
        <Box
          gridColumn="span 1"
          gridRow="span 1"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Unlimited Consultations per Month, Unlimited GP consultations for you and your family members, GP consultation via Audio/Video Call or Chat, Maintain your Personal Medical Record for Free. Access to Diagnostic Services.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Benefits