import React from "react";
import { Link, Route } from "react-router-dom";

class Search extends React.Component {
  token = null;
  state = {};

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      query: "",
      games: [],
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e) {
    this.setState({ isVisible: !this.state.isVisible });
  }

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
        }
      });
  };

  render() {
    return (
      <>
        <form onClick={this.onToggle} className="form-inline my-2 my-lg-0 ">
          <input
            className="form-control mr-sm-2 search-bar"
            type="text"
            placeholder="Search games..."
            onChange={(e) => this.onChange(e)}
          />
        </form>
        {this.state.isVisible && (
          <div className="searchResults">
            {this.state.games.map((game, index) => (
              <Link key={index} to={`/details/${game.slug}`}>
                {game.name}
              </Link>
            ))}
          </div>
        )}
      </>
    );
  }
}

export default Search;
