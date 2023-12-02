import { FC } from "react"
import { ListingCardData } from "../types"
import { Carousel } from "react-responsive-carousel"
import { styled } from "@mui/material"

const StyledCarousel = styled(Carousel)({
  direction: "ltr",
  "& *": {
    maxHeight: 400,
  },
})

const StyledImage = styled("img")({
  height: "100%",
  objectFit: "cover",
})

const ImageCarousel: FC<Pick<ListingCardData, "imageUrls">> = ({
  imageUrls,
}) => {
  return (
    <StyledCarousel
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
      {imageUrls.map(url => (
        <StyledImage key={url} src={url} alt={"Apartment"} />
      ))}
    </StyledCarousel>
  )
}

export default ImageCarousel
