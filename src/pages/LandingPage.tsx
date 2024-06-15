import { Button } from '@mui/material';
import { Link } from'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
     <Link to="/browse"> 
      <Button variant="contained" color="primary">Press here to see listings</Button>
    </Link>
    </div>
  );
};

export default LandingPage;
