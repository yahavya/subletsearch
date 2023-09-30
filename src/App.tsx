import React from "react"
import "./App.css"
import ListingCard from "./components/ListingCard"
import mockData from "./mockData"

function App() {
  return (
    <div>
      <ListingCard {...mockData[0]} />
    </div>
  )
}

export default App
