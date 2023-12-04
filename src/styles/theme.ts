import { createTheme } from "@mui/material"

const theme = createTheme({
  typography: {
    fontFamily: [
      "Heebo",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
    ].join(","),
  },
})

export default theme
