// HomeBar.tsx

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const HomeBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">sublet.search</Typography>
        {/* Add navigation links or other elements as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default HomeBar;
