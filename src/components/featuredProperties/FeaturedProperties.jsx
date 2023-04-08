import React from "react";
import "./featuredProperties.css";
import { BACKEND_URL } from "../../config";
import useFetch from "../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `${BACKEND_URL}/hotels?featured=true`
  );

  let hotels = data.hotels;
  // console.log(hotels);
  const images = [
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1",
  ];
  return (
    // fp start
    <div className="fp">
      {loading ? (
        "loading ..."
      ) : (
        <>
          {hotels?.map((ele, idx) => (
            <div className="fpItem" key={idx}>
              <img src={images[idx]} className="fpImg" alt="img" />
              <span className="fpName">{ele?.name}</span>
              <span className="fpCity">{ele?.city}</span>
              <span className="fpPrice">
                Starting from ${ele?.cheapestPrice}
              </span>
              {ele?.rating && (
                <div className="fpRating">
                  <button>8.9</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
    // fp end
  );
};
export default FeaturedProperties;
