import "./searchResult.scss";
import NoResults from "../../assets/no-results.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { ContentWrapper, MovieCard, Spinner } from "../../components";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);

    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fromNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({ ...data, results: [...data?.results, ...res?.results] });
        } else {
          setData(res);
        }

        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="search-results-page">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="page-title">
                {`Search ${
                  data?.total_results > 1 ? "Results" : "Result"
                } of '${query}'`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fromNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, i) => {
                  if (item?.media_type === "person") return;

                  return <MovieCard key={i} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="result-not-found">Sorry, Data Not Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
