import { ThemeProvider } from "@mui/material"
import ListingCard from "./components/ListingCard"
import mockData from "./mockData"
import theme from "./styles/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        <ListingCard {...mockData[1]} />
        <ListingCard {...mockData[0]} />
        <ListingCard {...mockData[2]} />
        <ListingCard {...mockData[3]} />
      </div>
    </ThemeProvider>
  )
}

export default App
