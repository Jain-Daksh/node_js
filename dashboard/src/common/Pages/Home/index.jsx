import React from "react";
import { useState } from 'react';
import FlexBetween from "common/components/FlexBetween";
import Header from "common/components/Header";
import HomePageBOX from "common/components/Box";

import {
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
const Home = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Home Page" subtitle="Welcome to your dashboard" />
      </FlexBetween>

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
        <HomePageBOX
          title="Book a Consultation"
          description="Your Time. Your Convenience.
                No more waiting to visit a doctor!
                Book a Consultation as per your convenience!" />
        <HomePageBOX title="My Appointments"
          description="View all your appointments details in one place"
          linkOfUrl="/dashboard"
        />
        <HomePageBOX title="My Benefits" description="My Benefits" linkOfUrl="/benefits"
        />
        <HomePageBOX title="Chat with Doctor" description=" Put your questions to our panel of experts!" />
        <HomePageBOX title="" description="" />
        <HomePageBOX title="" description="" />
        <HomePageBOX title="" description="" />
        <HomePageBOX title="" description="" />

      </Box>
    </Box>
  );
};

export default Home