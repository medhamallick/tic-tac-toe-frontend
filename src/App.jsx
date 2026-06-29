import { BrowserRouter, Routes, Route} from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Home from "./pages/Home";
import Computer from "./pages/Computer";
import Users from "./pages/Users";
import GameRoom from "./pages/GameRoom";
import Profile from "./components/Profile";
import EditProfile from "./pages/EditProfile";
import UserProfile from "./pages/UserProfile";


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
              path="profile"
              element={<Profile />}
          />
          <Route
              path="edit-profile"
              element={<EditProfile />}
          />
          <Route
              path="game/:roomId"
              element={<GameRoom />}
          />
          <Route
              path="user/:userId"
              element={<UserProfile />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
