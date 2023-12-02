import { FC } from "react"
import { ListingCardData } from "../types"
import { styled, Card, Typography } from "@mui/material"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const StyledCard = styled(Card)({
  width: 400,
})

const StyledImage = styled("img")({
  height: "100%",
  objectFit: "cover",
})

const ListingCard: FC<ListingCardData> = data => {
  return (
    <StyledCard>
      <Carousel
        infiniteLoop
        centerMode={false}
        dynamicHeight={false}
        transitionTime={1000}
        selectedItem={0}
        swipeable={false}
        showIndicators
        showArrows
        showThumbs={false}
        showStatus={false}
        axis={"horizontal"}
      >
        {data.imageUrls.map(url => (
          <StyledImage key={url} src={url} alt={"Apartment"} />
        ))}
      </Carousel>
      <Typography variant="h3">{`₪${data.price}`}</Typography>
    </StyledCard>
  )
}

export default ListingCard
