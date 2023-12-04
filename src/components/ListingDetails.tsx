import { FC } from "react"
import { ListingFullData } from "../types"
import { Typography } from "@mui/material"

const ListingDetails: FC<ListingFullData> = data => {
  return <Typography variant="h1">{data.city}</Typography>
}

export default ListingDetails
