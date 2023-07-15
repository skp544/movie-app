import "./home.scss";
import { HeroBanner, Popular, TopRated, Trending } from "../";

const Home = () => {
  return (
    <div className="homepage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
