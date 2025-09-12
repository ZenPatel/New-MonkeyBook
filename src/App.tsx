import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { CreatePostPage } from "./pages/CreatePostPage";
import { PostPage } from "./pages/PostPage";
import { CreateCommunityPage } from "./pages/CreateCommunityPage";
import { CommunitiesPage } from "./pages/CommunitiesPage";
import { CommunityPage } from "./pages/CommunityPage";
import { LoginPage } from "./pages/LoginPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { GamesPage } from "./pages/GamesPage";
import { SnakeGamePage } from "./pages/SnakeGamePage";
import { TicTacToeGamePage } from "./pages/TicTacToeGamePage";
import { PongGamePage } from "./pages/PongGamePage";
import { UserPage } from "./pages/UserPage";
import { UserListPage } from "./pages/UserListPage";
import { ChatRoomPage } from "./pages/ChatRoomPage";
import { SuperMarioBrosPage } from "./pages/SuperMarioBrosPage";
import { OcarinaPage } from "./pages/OcarinaPage";
import { PunchOutPage } from "./pages/PunchOutPage";

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/community/create" element={<CreateCommunityPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/community/:id" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/snake" element={<SnakeGamePage />} />
          <Route path="/games/tictactoe" element={<TicTacToeGamePage />} />
          <Route path="/games/pong" element={<PongGamePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/raproom" element={<ChatRoomPage />} />
          <Route path="/games/mario" element={<SuperMarioBrosPage />} />
          <Route path="/games/ocarina" element={<OcarinaPage />} />
          <Route path="/games/punchout" element={<PunchOutPage />} />
        </Routes>
      </div>
    </div>
  ); 
}

export default App;
