import { Button, Typography } from '@mui/material';
import { Link } from'react-router-dom';
import { ReactTyped } from 'react-typed';
import { useEffect, useRef } from 'react'

const LandingPage = () => {
  return (
    <><div><ReactTyped strings={["Welcome to sublet.search. I'm Yaron, and this site was made in order to help you find your next sublet. Click on the button below to get started!"]} typeSpeed={40} 
    style={{
    justifyContent: "center",
    display: "flex",
    fontSize: "2rem", // Change the font size to 2rem (adjust as needed)
    fontFamily: "Roboto, sans-serif", // Change the font to Roboto or Calibri
    textAlign: "center"
  }}></ReactTyped>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
     <Link to="/browse">
      <Button variant="contained" color="primary" style={{fontSize: "1.5rem"}}>Press here to see listings</Button>
    </Link>
    </div>
    </>
  );
};

export default LandingPage;
