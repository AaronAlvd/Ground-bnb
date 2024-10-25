import './EditSpots.css';
import * as spotActions from "../../../store/spots"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function EditSpots({ spotId }) {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);
  const spot = spots.find((data) => data.id === Number(spotId))

  useEffect(() => {
    const fetchSpots = async() => {
      await dispatch(spotActions.getSpots())
    }
    fetchSpots();
  }, [dispatch])

  return (
    <div className='div-spotEditForm'>
      <form>

        <div className="div-ESFI">
          <input type="text" name="address" placeholder={spot.address}/>
        </div>

        <div className="div-ESFI">
          <input type="text" name="city" placeholder={spot.city}/>
        </div>

        <div className="div-ESFI">
          <input type="text" name="state" placeholder={spot.state}/>
        </div>

        <div className="div-ESFI">
          <input type="text" name="country" placeholder={spot.country}/>
        </div>

        <div className="div-ESFI">
          <input type="text" name="lat" placeholder={spot.lat}/>
        </div>

        <div className="div-ESFI">
          <input type="text" name="lng" placeholder={spot.lng}/>
        </div>

        <div className="div-ESFI">
          <textarea name="description" className="ESFI-textarea"/>
        </div>

        <div className="div-ESFI">
          <input type="number" name="price" placeholder={spot.price}/>
        </div>

        <div className="div-ESFI">
          <input type="text" name="name" placeholder={spot.name}/>
        </div>
      </form>
    </div>
  )
}

export default EditSpots;