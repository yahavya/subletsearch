import { FC } from "react"
import { ListingCardData } from "../types"
import { Box, styled } from "@mui/material"
import IconField from "./IconField"

import {
  faExpand,
  faStairs,
  faPersonShelter,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons"

type Props = Pick<
  ListingCardData,
  "postDate" | "startDate" | "endDate" | "roomCount" | "floorNumber" | "area"
>

const StyledRowContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  gap: 16,
})

const GeneralInfoRow: FC<Props> = ({
  postDate,
  startDate,
  endDate,
  roomCount,
  floorNumber,
  area,
}) => {
  const areaString = area ? `${area} מ"ר` : null
  const floorNumberString = floorNumber ? `קומה ${floorNumber}` : null
  const roomCountString = roomCount ? `${roomCount} חדרים` : null
  const dateRange = endDate ? `${startDate} - ${endDate}` : `מ-${startDate}`
  return (
    <StyledRowContainer>
      <IconField icon={faExpand}>{areaString}</IconField>
      <IconField icon={faStairs}>{floorNumberString}</IconField>
      <IconField icon={faPersonShelter}>{roomCountString}</IconField>
      <IconField icon={faCalendarDays}>{dateRange}</IconField>
    </StyledRowContainer>
  )
}
export default GeneralInfoRow
