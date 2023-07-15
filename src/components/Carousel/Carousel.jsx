import { useRef } from "react";

import "./carousel.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircleRating, ContentWrapper, Genres, Img } from "../";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import PosterFallback from "../../assets/no-poster.png";
import dayjs from "dayjs";

const Carousel = ({ data, loading, endpoint }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skeItem = () => {
    return (
      <div className="skeleton-item">
        <div className="poster-block skeleton"></div>
        <div className="text-block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carousel-left-nav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel-right-nav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carousel-items" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item?.poster_path
                ? url.poster + item?.poster_path
                : PosterFallback;

              return (
                <div
                  key={item.id}
                  className="carousel-item"
                  onClick={() =>
                    navigate(`/${item?.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="poster-block">
                    <Img src={posterUrl} />
                    <CircleRating rating={item?.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="text-block">
                    <span className="title">{item?.title || item?.name}</span>
                    <span className="date">
                      {dayjs(item?.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading-skeleton">
            {skeItem()}
            {skeItem()}
            {skeItem()}
            {skeItem()}
            {skeItem()}
            {skeItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
