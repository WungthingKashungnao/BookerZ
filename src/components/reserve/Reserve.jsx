import React, { useContext, useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "../../config";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Reserve = ({ setOpen, hotelId }) => {
  // state for selected rooms from a hotel
  const [selectedRooms, setSelectedRooms] = useState([]);
  const id = useParams(); //this id will hold the hotel id
  // using custom hook to fetch data from backend
  const { data, loading, error } = useFetch(
    `${BACKEND_URL}/hotels/room/${id.id}`
  );
  const { date } = useContext(SearchContext); //getting the selected date from searchContext

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
  console.log(getDateInRange(date[0].startDate, date[0].endDate));

  //   function to reserve room
  const handleClick = () => {};
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
            {/* different room of a hotel */}
            {item?.roomNumbers.map((roomNumber) => (
              <div className="room">
                <label>{roomNumber.number}</label>
                {/* handleSelecet to select room from that hotel*/}
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                />
              </div>
            ))}
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
