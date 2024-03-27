import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import EPG from "./pages/EPG/EPG.jsx";
import EPGInfoDTV from "./pages/EPG-InfoDTV/EPG-InfoDTV.jsx";
import InitialApp from "./pages/InitialApp/InitialApp.jsx";
import GuiaPorEmissora from "./pages/GuiaPorEmissora/index.jsx";
import GuiaPorGenero from "./pages/GuiaPorCategoria/index.jsx";
import GuiaRadiodifusor from "./pages/GuiaRadiodifusor/index.jsx";
import GuiaCategoria from "./pages/GuiaCategoria/index.jsx";
import Homepage from "./pages/Homepage/index.jsx";
import Fabricante from "./pages/Fabricante/index.jsx";
import Related from "./pages/Related/index.jsx";
import TvAberta from "./pages/TvAberta/index.jsx";
import Apps from "./pages/Aplicativos/index.jsx";
import EPGTimeline from "./pages/EPG-Timeline/index.jsx";
import ProfileConfig from "./pages/ProfileConfig/index.jsx";
import CreateProfile from "./pages/CreateProfile/index.jsx";
import SelectLanguage from "./pages/SelectLanguage/index.jsx";
import DiscoverChannels from "./pages/DiscoverChannels/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Fabricante />,
  },
  {
    path: "/SelectLanguage",
    element: <SelectLanguage />,
  },
  {
    path: "/ProfileConfig",
    element: <ProfileConfig />,
  },
  {
    path: "/CreateProfile",
    element: <CreateProfile />,
  },
  {
    path: "/DiscoverChannels",
    element: <DiscoverChannels />,
  },
  {
    path: "/related",
    element: <Related />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/tvAberta",
    element: <TvAberta />,
  },
  {
    path: "/apps",
    element: <Apps />,
  },
  {
    path: "/EPG",
    element: <EPG />,
  },
  {
    path: "/EPG-InfoDTV",
    element: <EPGInfoDTV />,
  },
  {
    path: "/EPG-Timeline",
    element: <EPGTimeline />,
  },
  {
    path: "/GuiaTvAberta",
    element: <GuiaPorEmissora />,
  },
  {
    path: "/GuiaPorGenero",
    element: <GuiaPorGenero />,
  },
  {
    path: "/GuiaCategoria",
    element: <GuiaCategoria />,
  },
  {
    path: "/GuiaRadiodifusor",
    element: <GuiaRadiodifusor />,
  },
  {
    path: "/InitialApp",
    element: <InitialApp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
