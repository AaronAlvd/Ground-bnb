import './EditSpots.css';
import * as spotActions from "../../../store/spots"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function EditSpots({ spotId }) {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);
  const spot = spots.find((data) => data.id === Number(spotId));
  // const [formData, setFormData] = useState({
  //   address: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   name: "",
  //   lat: "",
  //   lng: "",
  //   description: "",
  //   price: "",
  // });

  useEffect(() => {
    const fetchSpots = async() => {
      await dispatch(spotActions.getSpots())
    }
    fetchSpots();
  }, [dispatch]);

  // const handleSubmit = () => {
    
  // };

  return (
      <div className='div-spotEditForm'>
        <form>
          <div className="div-ESFI">
            <label>Address</label>
            <input type="text" name="address" placeholder={spot.address}/>
          </div>

          <div className='div-wrapESFI'>
            <div className="div-ESFI">
              <label>City</label>
              <input type="text" name="city" placeholder={spot.city}/>
            </div>
            <div className="div-ESFI">
              <label>State</label>
              <input type="text" name="state" placeholder={spot.state}/>
            </div>
          </div>

          <div className="div-ESFI">
            <label>Country</label>
            <input type="text" name="country" placeholder={spot.country}/>
          </div>

          <div className='div-wrapESFI'>
            <div className="div-ESFI">
              <label>lat</label>
              <input type="text" name="lat" placeholder={spot.lat}/>
            </div>
            <div className="div-ESFI">
              <label>lng</label>
              <input type="text" name="lng" placeholder={spot.lng}/>
            </div>
          </div>

          <div className="div-ESFI">
            <label>Description</label>
            <textarea name="description" className="ESFI-textarea"/>
          </div>

          <div className="div-ESFI">
            <label>Price</label>
            <input type="number" name="price" placeholder={spot.price}/>
          </div>

          <div className="div-ESFI">
            <label>Name</label>
            <input type="text" name="name" placeholder={spot.name}/>
          </div>
          <div className='div-ESFI-button'>
            <button className='EFI-buttons'>Submit</button>
          </div>
        </form>
      </div>
  )
}

export default EditSpots;