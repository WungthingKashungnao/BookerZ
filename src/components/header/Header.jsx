import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import format from "date-fns/format"; //package for formatiing date
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../authContext/AuthContext";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(""); //state for user destination
  const { user } = useContext(AuthContext); //getting user from AuthContext

  // ranges for date, using react-date-range package
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false); // state to open and close date calender

  const [openOptions, setOpenOptions] = useState(false); //stae to open and close options from searchbar

  // state for options on searchbar
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // fucntion to handle options
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        //here prev is the data of the options object, we are changing these options state by passing values on click from options button
        //options[name] => we can also access objects in this way
        ...prev,
        [name]: operation === "incre" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  //using values from SearchContext
  const { dispatch } = useContext(SearchContext);

  // fucntion to navigate to list page
  const handleSearch = () => {
    // dispatch is a context value and we are sending data back to the context from this currnet file
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });

    // with usenavigate hook we can send satetes as well
    navigate("/list", { state: { destination, date, options } });
  };

  return (
    <div className="header">
      {/* headerContainer start */}
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {/* header list start */}
        <div className="headerList">
          {/* header item */}
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>

          {/* header item */}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          {/* header item */}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>

          {/* header item */}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          {/* header item */}
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
        {/* header list end */}

        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free Booker account
            </p>
            {/* if there is no user or logged out show this button */}
            {!user && <button className="headerBtn">Sign in/ Register</button>}

            {/* search bar start */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {/* date range using react-date-range package */}
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="date"
                  />
                )}
              </div>

              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>

                {/* this will show and hide the options handler based on the state of the option */}
                {openOptions && (
                  //options start
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "decre")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "incre")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "decre")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "incre")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "decre")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "incre")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  //options end
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
            {/* search bar end */}
          </>
        )}
      </div>
      {/* headerContainer end */}
    </div>
  );
};

export default Header;
