import { FC } from "react"
import { ListingCardData } from "../types"
import { styled, Card } from "@mui/material"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader

const ListingCard: FC<ListingCardData> = data => {
  const StyledCard = styled(Card)({
    width: 200,
  })

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
          <img key={url} src={url} alt={"Photo of apartment"} />
        ))}
      </Carousel>
      <div>{data.price}</div>
    </StyledCard>
  )
}

export default ListingCard
