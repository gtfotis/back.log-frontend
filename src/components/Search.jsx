import React from "react";
import { Link } from "react-router-dom";

class Search extends React.Component {
  token = null;
  state = {
    query: "",
    games: [],
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({
      query: value,
    });

    this.search(value);
  };

  search = (query) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${api_key}&search=${query}`;
    const token = {};
    this.token = token;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (this.token === token) {
          this.setState({ games: data.results });
          console.log("search results are: ", data.results);
          console.log("data is: ", this.state.games);
        }
      });
  };

  render() {
    return (
      <>
        <form>
          <input
            type="text"
            className="search-bar"
            placeholder="Search games..."
            onChange={(e) => this.onChange(e)}
          />
          <div className="searchResults">
            {this.state.games.map((game, index) => (
              <Link to={`/${game.slug}`}>
                <p key={index}>{game.name}</p>
              </Link>
            ))}
          </div>
        </form>
      </>
    );
  }
}

export default Search;
