import { FC } from "react"
import { ListingCardData } from "../types"
import { styled, Card, Typography } from "@mui/material"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ImageCarousel from "./ImageCarousel"
import GeneralInfoRow from "./GeneralInfoRow"
import LocationRow from "./LocationRow"


const StyledCard = styled(Card)({
  width: 500,
  display: "block"
})



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
      <Typography variant="h3">{`₪${price}`}</Typography>
      <ImageCarousel imageUrls={imageUrls} />
      <LocationRow neighborhood={neighborhood} street={street} />
      <GeneralInfoRow
        postDate={postDate}
        startDate={startDate}
        endDate={endDate}
        roomCount={roomCount}
        floorNumber={floorNumber}
        area={area}
      />
    </StyledCard>
  )
}

export default ListingCard


