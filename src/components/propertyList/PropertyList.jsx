import React from "react";
import "./propertyList.css";
import { BACKEND_URL } from "../../config";
import useFetch from "../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    `${BACKEND_URL}/hotels/countByType`
  );
  // console.log(data);
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  return (
    // pList start
    <div className="pList">
      {loading ? (
        "Loading ..."
      ) : (
        <>
          {data?.map((ele, idx) => (
            <div className="pListItem" key={idx}>
              <img src={images[idx]} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{ele?.type}</h1>
                <h2>
                  {ele?.count} {ele?.type}
                </h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
    // pList end
  );
};

export default PropertyList;
