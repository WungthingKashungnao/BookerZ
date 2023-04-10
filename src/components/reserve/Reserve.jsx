import React, { useContext, useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "../../config";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";

const Reserve = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();
  // state for selected rooms from a hotel
  const [selectedRooms, setSelectedRooms] = useState([]);
  const id = useParams(); //this id will hold the hotel id
  // using custom hook to fetch data from backend
  const { data, loading, error } = useFetch(
    `${BACKEND_URL}/hotels/room/${id.id}`
  );
  const { date } = useContext(SearchContext); //getting the selected date from searchContext

  // function to get date range selected by user
  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = new Date(start.getTime());

    let list = [];
    while (dates <= end) {
      list.push(new Date(dates).getTime());
      dates.setDate(dates.getDate() + 1);
    }
    return list;
  };
  //   function to select room from a hotel
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const alldates = getDateInRange(date[0].startDate, date[0].endDate);

  // function to check all available rooms, according to dates whether booked or not
  const isAvailable = (roomNumber) => {
    // roomNumber.unavailableDates is a proptery of Room Modal
    const isFound = roomNumber.unavailableDates.some((date) => {
      alldates.includes(new Date(date).getTime());
    });

    // here we are returning false because if it is true, it is saying that the room is booked, so we cannot have access to book the room, so we return only false
    return !isFound;
  };

  //   function to reserve room
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.patch(
            `${BACKEND_URL}/rooms/availability/${id.id}`,
            { date: alldates }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (error) {}
  };

  console.log(date);
  return (
    <div className="reserve">
      <div className="rContainer">
        {/* fontawsome icon used for closing the reseerve modal */}
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Your Rooms</span>
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item?.title}</div>
              <div className="rDesc">{item?.desc}</div>
              <div className="rMax">
                Max people: <b>{item?.maxPeople}</b>
              </div>
              <div className="rPrice">{item?.price}</div>
            </div>

            <div className="rSelectRooms">
              {/* different room of a hotel */}
              {item?.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  {/* handleSelecet to select room from that hotel*/}
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    // disable checkbox is room is not availbale
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* button to reserve */}
        <button onClick={handleClick} className="rButton">
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
