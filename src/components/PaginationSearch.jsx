// import React from "react";
// import Loader from "../loader.gif";

// class PaginationSearch extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       query: "",
//       results: {},
//       loading: false,
//       message: "",
//     };
//   }

//   handleOnInputChange = (e) => {
//     const query = e.target.value;

//     if (!query) {
//       this.setState({ query, loading: true, message: "" });
//     } else {
//       this.setState({ query, loading: true, message: "" }, () => {
//         this.search(query);
//       });
//     }
//   };

//   search = (query) => {
//     const api_key = process.env.REACT_APP_API_KEY;
//     const url = `https://api.rawg.io/api/games?key=${api_key}&search=${query}`;
//     const token = {};
//     this.token = token;

//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         if (this.token === token) {
//           this.setState({ games: data.results });
//           console.log("search results are: ", data.results);
//           console.log("data is: ", this.state.games);
//         }
//       });
//   };

//   renderSearchResults = () => {
//     const { results } = this.state;
//     if (Object.keys(results).length && results.length) {
//       return (
//         <div className="results-container">
//           {results.map((result) => {
//             return (
//               <a
//                 key={result.name}
//                 href={`/details/${result.slug}`}
//                 className="result-items"
//               >
//                 <h6 className="image-username">{result.name}</h6>
//                 <div className="image-wrapper">
//                   <img
//                     className="image"
//                     src={result.background_iimage}
//                     alt={result.name}
//                   />
//                 </div>
//               </a>
//             );
//           })}
//         </div>
//       );
//     }
//   };

//   render() {
//     const { query, message, loading } = this.state;
//     return (
//       <div className="container">
//         {/* heading */}
//         <h2 className="heading"> Live Search: React Application</h2>
//         {/* search input */}
//         <label className="search-label" htmlFor="search-input">
//           <input
//             type="text"
//             value={query}
//             id="search-input"
//             placeholder="Search games..."
//             onChange={this.handleOnInputChange}
//           />
//           <i className="fa fa-search search-icon" />
//         </label>
//         {/*Error Message*/}
//         {message && <p className="message">{message}</p>}
//         {/*Loader*/}
//         <img
//           src={Loader}
//           className={`search-loading ${loading ? "show" : "hide"}`}
//           alt="loader"
//         />
//         {/* results */}
//         {this.renderSearchResults()}
//       </div>
//     );
//   }
// }

// export default PaginationSearch;
