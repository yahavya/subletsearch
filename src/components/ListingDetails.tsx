import { FC } from "react";
import { ListingFullData } from "../types";

const ListingDetails: FC<ListingFullData> = (data) => {
  return <div>{data.city}</div>;
};

export default ListingDetails;
