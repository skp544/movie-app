import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./redux/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Details, Explore, Home, PageNotFound, SearchResult } from "./pages";
import { Header, Footer } from "./components";

const App = () => {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        console.log(res);

        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          profile: res?.images?.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      })
      .catch((err) => {
        console.log("error to fetch api");
        console.log(err);
      });
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
