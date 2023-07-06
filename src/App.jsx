import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"

// //Pages
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Faq from "./pages/Faq.jsx"
import Contact from "./pages/Contact.jsx"
import Error from "./pages/Error.jsx"
import Weather from "./pages/Weather.jsx"
import Stocks from "./pages/Stocks.jsx"

// //Layouts
import RootLayout from "./layouts/RootLayout.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="stocks" element={<Stocks />} />
      <Route path="faq" element={<Faq />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="weather" element={<Weather />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
