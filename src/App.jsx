import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

// //Pages
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Error from "./pages/Error.jsx"
import Stock from "./pages/Stock.jsx"
import Stocks from "./pages/Stocks.jsx"
import Portfolio from "./pages/Portfolio.jsx"
import Portfolios from "./pages/Portfolios.jsx"
import Backtest from "./pages/Backtest.jsx"
import Backtests from "./pages/Backtests.jsx"
import Login from "./pages/Login.jsx"
import Settings from "./pages/Settings.jsx"

// //Layouts
import RootLayout from "./layouts/RootLayout.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="stocks" element={<Stocks />} />
      <Route path="stock/:id" element={<Stock />} />
      <Route path="portfolios" element={<Portfolios />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="portfolio/:id" element={<Portfolio />} />
      <Route path="backtests" element={<Backtests />} />
      <Route path="backtest" element={<Backtest />} />
      <Route path="backtest/:id" element={<Backtest />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="signup" element={<Settings />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
