// import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SinglePlayer from "./pages/SinglePlayer";
import MultiPlayer from "./pages/Multiplayer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/computer" element={<SinglePlayer/>}/>
      <Route path="/multiplayer" element={<MultiPlayer/>}/>
    </Routes>
  );
}

export default App;