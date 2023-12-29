import { FC } from "react"
import { ListingCardData } from "../types"
import { styled, Card, Typography } from "@mui/material"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ImageCarousel from "./ImageCarousel"
import GeneralInfoRow from "./GeneralInfoRow"
import LocationRow from "./LocationRow"

const StyledCard = styled(Card)({
  width: 500,
})

const ListingCard: FC<ListingCardData> = ({
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
  return (
    <StyledCard>
      <Typography variant="h3">{`₪${price}`}</Typography>
      <p>IMAGE CAROUSEL</p>
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


//  <ImageCarousel imageUrls={imageUrls} /> - CURRENTLY NOT RENDERING IMAGES, NEED TO FIX THIS