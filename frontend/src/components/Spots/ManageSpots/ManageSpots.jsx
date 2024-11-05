import { useEffect } from "react";
import * as spotActions from "../../../store/spots"; 
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ConfirmDeleteSpot from "../ConfirmDeleteSpot/ConfirmDeleteSpot";
import { useNavigate, NavLink } from "react-router-dom";
import './ManageSpots.css'


function ManageSpots() {
  const spots = useSelector((state) => state.spots.spots);
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const userSpots = spots.reduce((acc, spot) => {
    if (spot.ownerId === user.id) {
      acc.push(spot);
    }
    return acc;
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpots = async () => {
      if (user) {
        await Promise.all([
          dispatch(spotActions.getSpots()),
        ])
      }
    }
    fetchSpots();
  }, [user, dispatch])

  return (

    <div className="MS-div">
      <h2 className="MS-title">Manage Spots</h2>
      <div className="MS-div-grid">
        <div className="MS-div-spotsGallery">
          {userSpots.length > 0 ? userSpots.map((spot) => {
             const previewImage = () => {
              const previewImageObj = spot.spotImages.find(obj => obj.preview);
              if (previewImageObj) {
                const byteArray = new Uint8Array(previewImageObj.file.data);
                const binaryString = Array.from(byteArray)
                  .map(byte => String.fromCharCode(byte))
                  .join('');
                return `data:image/jpeg;base64,${btoa(binaryString)}`; // Adjust MIME type if needed
              }
              return null; // Return null if no preview image is found
             };
            return (
              <div className="MS-div-box" key={spot.id}>
                <img className="MS-Image" src={previewImage()} onClick={() => navigate(`/spots/${spot.id}`)}/>
                <div className="MS-div-spotBody">
                  <div className="SDA-Location"><p className="SDA-info-p">{spot.city}, {spot.state}</p>  
                    {spot.avgRating ? <p className="SDA-info-p"><FontAwesomeIcon className="SDA-icon"icon={faStar}/>{spot.avgRating.toFixed(2)}</p>:
                                      <p className="SDA-info-p"><FontAwesomeIcon className="SDA-icon"icon={faStar}/>New</p>}
                  </div>
                  <div className="MS-div-buttons">
                    <button className="MS-button"onClick={() => navigate('/updatespotform')}>Update</button>
                    <button className="MS-button">
                      <OpenModalButton buttonText="Delete" modalComponent={<ConfirmDeleteSpot spotId={spot.id}/>}/>
                    </button>
                </div>
                </div>
              </div>
            )
          }): <h2><NavLink to="/spotformpage">Create a New Spot</NavLink></h2>
          }
        </div>
      </div>
    </div>
  );
}

export default ManageSpots;