import ListingCard from "./components/ListingCard"
import mockData from "./mockData"

function App() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <ListingCard {...mockData[1]} />
      <ListingCard {...mockData[0]} />
    </div>
  )
}

export default App
