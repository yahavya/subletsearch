import { ThemeProvider } from "@mui/material"
import theme from "./styles/theme"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import FeedPage from "./pages/FeedPage"
import HomeBar from "./components/HomeBar"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeBar />
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/browse" Component={FeedPage} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
