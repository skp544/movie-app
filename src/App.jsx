import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
const App = () => {
  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromApi("/movie/popular")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error to fetch api");
        console.log(err);
      });
  };

  return <div>App</div>;
};

export default App;
