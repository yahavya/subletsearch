import ListingCard from "../components/ListingCard"
import mockData from "../mockData"
import React, { useEffect, useState } from "react"

const FeedPage = () => {

  const [data, setData] = useState(null);

    useEffect(() => {
      fetch('http://127.0.0.1:5001/sublet-search-8ae44/us-central1/app/api/listings')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(error));
    }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  )
}
export default FeedPage




/*
<div style={{ display: "flex", gap: 16, marginTop: 10 }}>
      <ListingCard {...mockData[1]} />
      <ListingCard {...mockData[0]} />
      <ListingCard {...mockData[2]} />
      <ListingCard {...mockData[3]} /> 
      </div>
      */