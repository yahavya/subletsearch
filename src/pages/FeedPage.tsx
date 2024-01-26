import ListingCard from "../components/ListingCard"
//import mockData from "../mockData"
import React, { useEffect, useState } from "react"

interface Listing {
  id: number;
  postUrl: string;
  imageUrl: string[];
  price: number;
  entry_date: string
  startDate: string;
  endDate: string;
  neighborhood?: string; 
  street?: string; 
  roomCount: number;
  floorNumber?: number; 
  area?: number | null; 
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 10 }}>
      {data ? (
        data.listings.map((listing, index) => (
          <div key={index} style={{ width: "calc(25% - 16px)" }}>
            <ListingCard
              postUrl={listing.postUrl}
              id={listing.id}
              imageUrls={listing.imageUrl}
              price={listing.price}
              postDate={listing.entry_date}
              startDate={listing.startDate}
              endDate={listing.endDate}
              neighborhood={listing.neighborhood || ""}
              street={listing.street || ""}
              roomCount={listing.roomCount}
              floorNumber={listing.floorNumber || 0}
              area={listing.area || 0}
              city="Tel Aviv"
            />
          </div>
        ))
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default FeedPage;
