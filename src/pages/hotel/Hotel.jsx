import React, { useContext, useState } from "react";
import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import { BACKEND_URL } from "../../config";
import useFetch from "../../components/hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Reserve from "../../components/reserve/Reserve";
import { AuthContext } from "../../authContext/AuthContext";
// import { useLocation } from "react-router-dom"; //hook for getting path

// component for hotel page
const Hotel = () => {
  // const location = useLocation(); //hook for getting path
  // console.log(location);
  // const id = location.split("/"[2]);

  const id = useParams(); //this params stores the hotelId
  const { data, loading, error } = useFetch(
    `${BACKEND_URL}/hotels/find/${id.id}`
  );

  const { user } = useContext(AuthContext); //importing user from AuthContext
  const navigate = useNavigate();

  const { date, options } = useContext(SearchContext);
  // console.log(date);

  //function to calculate days
  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24; //calculating miliseconds in a day
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime()); //The getTime() method returns the number of milliseconds since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC.
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);

    return diffDays;
  };
  //calulated days
  const days = dayDifference(date[0].endDate, date[0].startDate);

  // state for carousel slide number
  const [slideNumber, setSlideNumber] = useState(0);
  // state for carousel to open and hide
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false); //state to open and close modal for booking and reservation

  // fucntion to open slide carousel
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // functon for carousel to move onc arrow click
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  // function to reserve or book hotel, only meant for logged in users
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading ..."
      ) : (
        <>
          {/* hotel container start */}
          <div className="hotelContainer">
            {/* to display image pop up  start*/}
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />

                <div className="sliderWrapper">
                  <img
                    src={data.hotels?.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>

                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            {/* to display image pop up  end*/}

            <div className="hotelWrapper">
              <button onClick={handleClick} className="bookNow">
                Reserve or Book Now
              </button>

              <h1 className="hotelTitle">{data.hotels?.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.hotels?.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location - {data.hotels?.distance}m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay overe ${data.hotels?.cheapestPrice} at this property
                and get a free airport taxi
              </span>

              <div className="hotelImages">
                {data.hotels?.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper">
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo[0]}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>

              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.hotels?.title}</h1>
                  <p className="hotelDesc">{data.hotels?.desc}</p>
                </div>

                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.hotels?.cheapestPrice * options.room}</b>{" "}
                    (${days} nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
          {/* hotel container end */}
        </>
      )}
      {/* show modal if modal state is true */}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id.id} />}
      {/* since id is an object and has the id property we are accseing the id property */}
    </div>
  );
};

export default Hotel;
