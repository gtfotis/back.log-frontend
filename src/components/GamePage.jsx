// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "../App.css";

// const Game = () => {
//   const { game_slug } = useParams();
//   const [game, setGame] = useState([]);

//   useEffect(() => {
//     (async () => {
//       const url = `http://localhost:3000/${game_slug}`;
//       const game = await fetch(url).then((res) => res.json());
//       setGame(game);
//       console.log("the response is: ", game);
//     })();
//   }, [setGame, game_slug]);

//   return (

//   );
// };

// export default Game;
