import React from "react";
import "./cast.scss";
import { useSelector } from "react-redux";
import { ContentWrapper, Img } from "../../../components";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="sk-item">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="cast-section">
      <ContentWrapper>
        <div className="section-heading">Top Cast</div>
        {!loading ? (
          <div className="list-items">
            {data?.map((item) => {
              let imgUrl = item?.profile_path
                ? url?.profile + item?.profile_path
                : avatar;

              return (
                <div key={item.id} className="list-item">
                  <div className="profile-img">
                    <Img src={imgUrl} />
                  </div>
                  <div className="name">
                    {item?.name}
                    <div className="character">{item?.character}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cast-skeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
