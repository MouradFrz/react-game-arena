import { useState } from "react";
import { useRoutes } from "react-router-dom";
import GameLayout from "./layouts/GameLayout";
import Home from "./pages/Home";
import Tenzies from "./pages/Tenzies"
function App() {
	const myRoutes = useRoutes([
		{
			path: "",
			element: <Home />,
		},
		{
			element: <GameLayout />,
			children: [
        {
          path:'/tenzies',
          element:<Tenzies />
        }
      ],
		},
	]);

	return <>{myRoutes}</>;
}

export default App;
