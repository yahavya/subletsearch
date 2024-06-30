import ListingCard from "../components/ListingCard"
//import mockData from "../mockData"
import React, { useEffect, useState } from "react"
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import {TailSpin} from "react-loader-spinner";

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    fetch('https://us-central1-sublet-search-8ae44.cloudfunctions.net/app/api/listings')
      .then(response => response.json())
      .then((json: ApiResponse) => setData(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <><div style={{ marginBottom: "20px", display: "flex", justifyContent: "center"  }}>
      <Typography variant="h6" gutterBottom style={{marginRight: "20px"}}>Adjust Price</Typography>
      <Slider
        value={priceRange}
        onChange={(event, newValue) => setPriceRange(newValue as [number, number])}
        valueLabelDisplay="auto"
        min={1000}
        max={10000}
        step={50}
        style={{ width: "30%"}} />
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 10 }}>
        {data ? (
          data.listings
            .filter((listing) => listing.price >= priceRange[0] && listing.price <= priceRange[1])
            .map((listing, index) => {
              // Check if the listing has enough data
              if (listing.postUrl &&
                listing.imageUrl &&
                typeof listing.price === 'number' && listing.price > 1000) {
                return (
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
                      city="Tel Aviv" />
                  </div>
                );
              }
              return null; // Skip rendering if the listing has mostly null values
            })
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
          </div>

        )}
      </div></>
  );
};

export default FeedPage;
