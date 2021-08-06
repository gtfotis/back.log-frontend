import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import GameList from "./components/GameList";

function App() {
  return (
    <div className="App">
      <Router>
        <GameList />
      </Router>
    </div>
  );
}

export default App;
