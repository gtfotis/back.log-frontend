import React from "react";
import { Link, Route } from "react-router-dom";

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
    console.log("the query is: ", value);
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
        <form className="form-inline my-2 my-lg-0 ">
          <input
            className="form-control mr-sm-2 search-bar"
            type="text"
            placeholder="Search games..."
            onChange={(e) => this.onChange(e)}
          />
          <div className="searchResults">
            {this.state.games.map((game, index) => (
              <Link key={index} to={`/details/${game.slug}`}>
                {game.name}
              </Link>
            ))}
          </div>
        </form>
      </>
    );
  }
}

export default Search;
