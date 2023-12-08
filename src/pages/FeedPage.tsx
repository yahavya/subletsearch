import ListingCard from "../components/ListingCard"
import mockData from "../mockData"

const FeedPage = () => {
  return (
    <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
      <ListingCard {...mockData[1]} />
      <ListingCard {...mockData[0]} />
      <ListingCard {...mockData[2]} />
      <ListingCard {...mockData[3]} />
    </div>
  )
}
export default FeedPage
