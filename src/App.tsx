import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// Pages.
import About from "./pages/about/About";
import HomePage from "./pages/homepage/HomePage";

// Layouts.
import Navbar from "./layouts/navbar/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
