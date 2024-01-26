import { FC } from "react";
import { ListingCardData } from "../types";
import { styled, Card, Typography, Box } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageCarousel from "./ImageCarousel";
import GeneralInfoRow from "./GeneralInfoRow";
import LocationRow from "./LocationRow";

const StyledCard = styled(Card)({
  width: "80%", // Adjust the width to your preference
  margin: "16px auto", // Center the card and add margin
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",

  "&:hover": {
    transform: "scale(1.05)",
  },
});

const PriceTypography = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "8px",
});

const ImageContainer = styled(Box)({
  width: "100%",
  height: "200px",
  overflow: "hidden",
});


const ListingCard: FC<ListingCardData> = ({
  postUrl,
  imageUrls,
  price,
  postDate,
  startDate,
  endDate,
  neighborhood,
  street,
  roomCount,
  floorNumber,
  area,
}) => {
  const handleClick = () => {
    // Handle click logic, e.g., navigate to the link
    window.open(postUrl, '_blank', 'noopener noreferrer');
  };

  return (
    <StyledCard onClick={handleClick}>
      <PriceTypography>{`₪${price}`}</PriceTypography>
      <ImageContainer>
        <ImageCarousel imageUrls={imageUrls} />
      </ImageContainer>      <Box p={2}>
        <LocationRow neighborhood={neighborhood} street={street} />
        <GeneralInfoRow
          postDate={postDate}
          startDate={startDate}
          endDate={endDate}
          roomCount={roomCount}
          floorNumber={floorNumber}
          area={area}
        />
      </Box>
    </StyledCard>
  );
};

export default ListingCard;
