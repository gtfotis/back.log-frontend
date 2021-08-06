import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import GameList from "./components/GameList";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <Router>
        <Search />
        <GameList />
      </Router>
    </div>
  );
}

export default App;
