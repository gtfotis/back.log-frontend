import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

const GetScreenshots = () => {
  const { game_slug } = useParams();
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    (async () => {
      const api_key = process.env.REACT_APP_API_KEY;
      const url = `https://api.rawg.io/api/games/${game_slug}/screenshots?key=${api_key}`;
      const screenshots = await fetch(url).then((res) => res.json());
      setScreenshots(screenshots);
      console.log("the screenshot response is: ", screenshots);
    })();
  }, [setScreenshots, game_slug]);

  return (
    <>
      {screenshots.results !== undefined ? (
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {!!screenshots.results.length >= 1 ? (
              <div className="carousel-item active">
                <img
                  src={`${screenshots.results[0].image}`}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ) : null}

            {!!screenshots.results.length >= 2 ? (
              <div className="carousel-item">
                <img
                  src={`${screenshots.results[1].image}`}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ) : null}
            {screenshots.results.length >= 3 ? (
              <div className="carousel-item">
                <img
                  src={`${screenshots.results[2].image}`}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ) : null}
            {screenshots.results.length >= 4 ? (
              <div className="carousel-item">
                <img
                  src={`${screenshots.results[3].image}`}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ) : null}
            {screenshots.results.length >= 5 ? (
              <div className="carousel-item">
                <img
                  src={`${screenshots.results[4].image}`}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ) : null}
            {screenshots.results.length >= 6 ? (
              <div className="carousel-item">
                <img
                  src={`${screenshots.results[5].image}`}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ) : null}
            {screenshots.results.length >= 7 ? (
              <div className="carousel-item">
                <img
                  src={`${screenshots.results[6].image}`}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            ) : null}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <p>Loading carousel for Sean...</p>
      )}
    </>
  );
};

export default GetScreenshots;
