import ListingCard from "../components/ListingCard"
//import mockData from "../mockData"
import React, { useEffect, useState } from "react"

interface Listing {
  id: number;
  imageUrl: string[];
  price: number;
  entry_date: string
  startDate: string;
  endDate: string;
  neighborhood?: string; // Adjust if necessary
  street?: string; // Adjust if necessary
  roomCount: number;
  floorNumber?: number; // Adjust if necessary
  area?: number | null; // Adjust if necessary
  // Add other properties as needed
}

interface ApiResponse {
  success: boolean;
  listings: Listing[];
  page: number;
  listingsPerPage: number;
}


const FeedPage = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/sublet-search-8ae44/us-central1/app/api/listings?page=1')
      .then(response => response.json())
      .then((json: ApiResponse) => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
      {data ? (
        data.listings.map((listing, index) => (
          <ListingCard
            id = {listing.id}
            key={index}
            imageUrls={listing.imageUrl}
            price={listing.price}
            postDate={listing.entry_date}
            startDate={listing.startDate}
            endDate={listing.endDate}
            neighborhood={listing.neighborhood || ""} // Default to empty string if undefined
            street={listing.street || ""} // Default to empty string if undefined
            roomCount={listing.roomCount}
            floorNumber={listing.floorNumber || 0} // Default to 0 if undefined
            area={listing.area || 0} // Default to 0 if undefined
            city = "Tel Aviv"
          />
        ))
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default FeedPage;


/*
<div style={{ display: "flex", gap: 16, marginTop: 10 }}>
      <ListingCard {...mockData[1]} />
      <ListingCard {...mockData[0]} />
      <ListingCard {...mockData[2]} />
      <ListingCard {...mockData[3]} /> 
      </div>
      */