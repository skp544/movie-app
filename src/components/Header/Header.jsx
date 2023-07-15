import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./header.scss";
import Logo from "../../assets/movix-logo.svg";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScroolY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScroolY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    console.log("enter");

    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobile-view" : ""} ${show}`}>
      <ContentWrapper>
        <Link to={"/"} className="logo">
          <img src={Logo} alt="movix" />
        </Link>

        <ul className="menu-items">
          <li
            className="menu-item"
            onClick={() => {
              navigationHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menu-item"
            onClick={() => {
              navigationHandler("tv");
            }}
          >
            TV Shows
          </li>
          <li className="menu-item">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobile-menu-items">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="search-bar">
          <ContentWrapper>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search movir or show..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
