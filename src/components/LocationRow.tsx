import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import IconField from "./IconField"
import { ListingCardData } from "../types"
import { FC } from "react"
import { Box, styled } from "@mui/material"

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
})

type Props = Pick<ListingCardData, "neighborhood" | "street">

const LocationRow: FC<Props> = ({ neighborhood, street }) => {
  if (!(street || neighborhood)) return null
  const locationString = street
    ? neighborhood
      ? `${street}, ${neighborhood}`
      : street
    : neighborhood
  return (
    <StyledContainer>
      <IconField icon={faLocationDot} typographyVariant="h5" iconSize="lg">
        {locationString}
      </IconField>
    </StyledContainer>
  )
}
export default LocationRow
