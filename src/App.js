import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Calculater from "./Components/Calculater";
import SearchApp from "./Components/SearchApp";
import SpeachRecogni from "./Components/SpeachRecogni";

function App() {
  const router = createBrowserRouter([
    {
      path: "/calculator",
      element: <Calculater />,
    },

    {
      path: "/searchapp",
      element: <SearchApp />,
    },
    { path: "/SpeachRecogni", element: <SpeachRecogni /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
