import { Link } from "react-router-dom";
import GameList from "./GameList";

const Home = () => {
  return (
    <>
      <GameList />
      <div className="explore">Need help organizing your backlog?</div>
      <div className="explore">More stuff</div>
    </>
  );
};

export default Home;
