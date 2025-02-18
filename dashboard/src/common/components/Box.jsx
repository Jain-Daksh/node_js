import React, { useState } from "react";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { Navigate } from "react-router-dom";

const HomePageBOX = ({ title, description, image, linkOfUrl }) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  return (
    <Box
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
      height='330px'
      width="350px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1.25rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <p>
            <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
              {title}
            </Typography>
            <p>{description}</p>
          </p>
        </Grid>
      </Grid>
      {show && <Button> <Navigate to={linkOfUrl} />Click Me </Button>}
    </Box>
  );
};

export default HomePageBOX;