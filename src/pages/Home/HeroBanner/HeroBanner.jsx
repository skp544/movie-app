import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { ContentWrapper, Img } from "../../../components";
import "./herobanner.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url?.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleSearchQuery = (e) => {
    navigate(`/search/${query}`);
  };

  return (
    <div className="hero-banner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer" />

      <ContentWrapper>
        <div className="hero-banner-content">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search movie or show..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={handleSearchQuery}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
