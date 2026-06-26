import { BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Home from "./pages/Home";
import Computer from "./pages/Computer";
import Users from "./pages/Users";
import GameRoom from "./pages/GameRoom";
// import GameInvitePopup from "./components/GameInvitePopup";

const App = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Body />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="home"
            element={<Home />}
          />
          <Route
            path="computer"
            element={<Computer />}
          />
          <Route
            path="users"
            element={<Users />}
          />
          <Route
              path="game/:roomId"
              element={<GameRoom />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
