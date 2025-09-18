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
import { MarioKartDSPage } from "./pages/MarioKartDSPage";
import { HNIDSPage } from "./pages/HNIDSPage";
import { NarutoNinjaCouncilPage } from "./pages/NarutoNinjaCouncilPage";
import { NarutoNinjaCouncil2Page } from "./pages/NarutoNinjaCouncil2Page";
import { TekkenGBAPage } from "./pages/TekkenGBAPage";
import { MajorasMaskPage } from "./pages/MajorasMaskPage";
import { MarioDSPage } from "./pages/MarioDSPage";
import { SonicPage } from "./pages/SonicPage";
import { Fifa95Page } from "./pages/Fifa95Page";
import { PvZPage } from "./pages/PvZPage";
import { Mario2JAPage } from "./pages/Mario2JAPage";
import { Mario2USAPage } from "./pages/Mario2USAPage";
import { Mario3Page } from "./pages/Mario3Page";
import { DrMarioPage } from "./pages/DrMarioPage";
import { PacManPage } from "./pages/PacManPage";
import { LoZPage } from "./pages/LoZPage";
import { DonkeyKongCountryPage } from "./pages/DonkeyKongCountryPage";
import { DonkeyKongCountryPage2 } from "./pages/DonkeyKongCountry2Page";
import { DonkeyKongCountryPage3 } from "./pages/DonkeyKongCountry3Page";
import { MarioWorldPage } from "./pages/MarioWorldPage";
import { SuperMarioKartPage } from "./pages/SuperMarioKartPage";
import { MarioRPGPage } from "./pages/MarioRPGPage";
import { MarioKart64Page } from "./pages/MarioKart64Page";
import { Mario64Page } from "./pages/Mario64Page";
import { WarioLandPage } from "./pages/WarioLandPage";
import { ConkerPage } from "./pages/ConkerPage";
import { MKTrilogyPage } from "./pages/MKTrilogyPage";
import { PokemonStadiumPage } from "./pages/PokemonStadiumPage";
import { PokemonStadium2Page } from "./pages/PokemonStadium2Page";
import { PokemonRedPage } from "./pages/PokemonRedPage";
import { PokemonBluePage } from "./pages/PokemonBluePage";
import { PokemonYellowPage } from "./pages/PokemonYellowPage";
import { Sonic2Page } from "./pages/Sonic2Page";
import { Sonic3Page } from "./pages/Sonic3Page";
import { SonicAndKnucklesPage } from "./pages/SonicAndKnucklesPage";
import { PokemonGoldPage } from "./pages/PokemonGoldPage";
import { PokemonSilverPage } from "./pages/PokemonSilverPage";
import { PokemonCrystalPage } from "./pages/PokemonCrystalPage";
import { PokemonRubyPage } from "./pages/PokemonRubyPage";
import { PokemonSapphirePage } from "./pages/PokemonSapphirePage";
import { PokemonEmeraldPage } from "./pages/PokemonEmeraldPage";
import { PokemonGreenPage } from "./pages/PokemonGreenPage";
import { PokemonLeafGreenPage } from "./pages/PokemonLeafGreenPage";
import { PokemonFireRedPage } from "./pages/PokemonFireRedPage";
import { MarioKartSuperCircuitPage } from "./pages/MarioKartSuperCircuitPage";
import { MarioAndLuigiSSPage } from "./pages/MarioAndLuigiSS";
import { PokemonMDRRTPage } from "./pages/PokemonMDRRTPage";

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
          <Route path="games/mariokartds" element={<MarioKartDSPage />} />
          <Route path="games/hnids" element={<HNIDSPage />} />
          <Route path="games/narutonc1" element={<NarutoNinjaCouncilPage />} />
          <Route path="games/narutonc2" element={<NarutoNinjaCouncil2Page />} />
          <Route path="games/tekkengba" element={<TekkenGBAPage />} />
          <Route path="games/majorasmask" element={<MajorasMaskPage />} />
          <Route path="games/mariods" element={<MarioDSPage />} />
          <Route path="games/sonic" element={<SonicPage />} />
          <Route path="games/fifa95" element={<Fifa95Page />} />
          <Route path="games/pvz" element={<PvZPage />} />
          <Route path="games/mario2ja" element={<Mario2JAPage />} />
          <Route path="games/mario2usa" element={<Mario2USAPage />} />
          <Route path="games/mario3" element={<Mario3Page />} />
          <Route path="games/drmario" element={<DrMarioPage />} />
          <Route path="games/pacman" element={<PacManPage />} />
          <Route path="games/loz" element={<LoZPage />} />
          <Route path="games/dk1" element={<DonkeyKongCountryPage />} />
          <Route path="games/dk2" element={<DonkeyKongCountryPage2 />} />
          <Route path="games/dk3" element={<DonkeyKongCountryPage3 />} />
          <Route path="games/marioworld" element={<MarioWorldPage />} />
          <Route path="games/supermariokart" element={<SuperMarioKartPage />} />
          <Route path="games/mariorpg" element={<MarioRPGPage />} />
          <Route path="games/mariokart64" element={<MarioKart64Page />} />
          <Route path="games/mario64" element={<Mario64Page />} />
          <Route path="games/warioland" element={<WarioLandPage />} />
          <Route path="games/conker" element={<ConkerPage />} />
          <Route path="games/mktrilogy" element={<MKTrilogyPage />} />
          <Route path="games/pokemonstadium" element={<PokemonStadiumPage />} />
          <Route path="games/pokemonstadium2" element={<PokemonStadium2Page />} />
          <Route path="games/pokemonred" element={<PokemonRedPage />} />
          <Route path="games/pokemonblue" element={<PokemonBluePage />} />
          <Route path="games/pokemonyellow" element={<PokemonYellowPage />} />
          <Route path="games/sonic2" element={<Sonic2Page />} />
          <Route path="games/sonic3" element={<Sonic3Page />} />
          <Route path="games/sonicandknuckles" element={<SonicAndKnucklesPage />} />
          <Route path="games/pokemongold" element={<PokemonGoldPage />} />
          <Route path="games/pokemonsilver" element={<PokemonSilverPage />} />
          <Route path="games/pokemoncrystal" element={<PokemonCrystalPage />} />
          <Route path="games/pokemonruby" element={<PokemonRubyPage />} />
          <Route path="games/pokemonsapphire" element={<PokemonSapphirePage />} />
          <Route path="games/pokemonemerald" element={<PokemonEmeraldPage />} />
          <Route path="games/pokemongreen" element={<PokemonGreenPage />} />
          <Route path="games/pokemonleafgreen" element={<PokemonLeafGreenPage />} />
          <Route path="games/pokemonfirered" element={<PokemonFireRedPage />} />
          <Route path="games/mariokartsupercircuit" element={<MarioKartSuperCircuitPage />} />
          <Route path="games/marioandluigiss" element={<MarioAndLuigiSSPage />} />
          <Route path="games/pokemonmdrrt" element={<PokemonMDRRTPage />} />
        </Routes>
      </div>
    </div>
  ); 
}

export default App;