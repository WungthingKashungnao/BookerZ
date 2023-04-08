import format from "date-fns/format"; //package for formatiing date
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

import "./list.css";
import SearchItem from "../../components/searchItem/SearchItem"; //component for displaying the search item
import { BACKEND_URL } from "../../config";
import useFetch from "../../components/hooks/useFetch"; //custom hook for fetchin api data from backend

const List = () => {
  const location = useLocation(); //state responsible for bringin in data from search in home page
  const [destination, setDestination] = useState(location.state.destination); //state for citites to go
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options); //for adult children room state
  const [openDate, setOpenDate] = useState(false); // state to open and close date calender
  const [min, setMin] = useState(undefined); //state for handling min price of hotel
  const [max, setMax] = useState(undefined); //state for handling max price of hotel
  const [newDestination, setNewDestination] = useState(""); //for updating destination state

  const { data, loading, error, reFetch } = useFetch(
    `${BACKEND_URL}/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }`
  );

  //function to handle Search Click button
  const handleClick = () => {
    setDestination(newDestination);
    reFetch();
    //we do not need to pass in url here as in the custom hook useFetch we have already passed the url once
  };
  return (
    <>
      <Navbar />
      <Header type="list" />

      {/* listContainer start */}
      <div className="listContainer">
        <div className="listWrapper">
          {/* list search start */}
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            <div className="lsItem">
              <label>Destination</label>
              <input
                type="text"
                onChange={(e) => setNewDestination(e.target.value)}
                placeholder={destination}
              />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Options</label>

              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    min={1}
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    min={0}
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    min={1}
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          {/* list search end */}

          {/* list result start */}
          <div className="listResult">
            {loading ? (
              "loading ..."
            ) : (
              <>
                {data.hotels?.map((item, idx) => (
                  <SearchItem item={item} key={item?._id} />
                ))}
              </>
            )}
          </div>
          {/* list result end */}
        </div>
      </div>
      {/* listContainer end */}
    </>
  );
};

export default List;
