import { FC } from "react"
import { ListingCardData } from "../types"
import { styled, Card } from "@mui/material"
import { Carousel } from "react-responsive-carousel"

const ListingCard: FC<ListingCardData> = data => {
  const StyledCard = styled(Card)({
    width: 200,
  })

  return (
    <StyledCard>
      <Carousel
        width={100}
        infiniteLoop
        centerMode={false}
        dynamicHeight={false}
        transitionTime={1000}
        selectedItem={0}
        swipeable={false}
        showIndicators
        showArrows
        axis={"horizontal"}
      >
        {data.imageUrls.map(url => (
          <img key={url} src={url} alt={"Photo of apartment"} />
        ))}
      </Carousel>
    </StyledCard>
  )
}

export default ListingCard
