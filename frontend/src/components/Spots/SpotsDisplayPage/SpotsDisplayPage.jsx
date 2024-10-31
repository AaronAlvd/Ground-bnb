import * as spotActions from '../../../store/spots'; // Import your actions
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './SpotsDisplayPage.css'

function SpotsDisplayPage() {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState({ id: null});
  const spots = useSelector((state) => state.spots.spots);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch]);

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  }

  return (
    <div className="SDP-div">
      {spots.map((spot) => {
        const previewImage = () => {
          for (let obj of spot.spotImages) {
            if (obj.preview) {
              return obj.url
            }
          }
        }

        return (
          <div className="SDP-div-SpotDiv" key={spot.id} onClick={() => handleClick(spot.id)} onMouseEnter={() => setIsHovered({ id: spot.id})} onMouseLeave={() => setIsHovered({ id: 0})}>
            <img className="SDP-img" src={previewImage()}/>
            <div className="SDP-div-SpotBody">
              <div className="SDA-Location"><p className="SDA-info-p">{spot.city}, {spot.state}</p>  
                {spot.avgRating ? <p className="SDA-info-p"><FontAwesomeIcon className="SDA-icon"icon={faStar}/>{spot.avgRating.toFixed(2)}</p>:
                                  <p className="SDA-info-p"><FontAwesomeIcon className="SDA-icon"icon={faStar}/>New</p>}
              </div>
            
              <div className="SDA-Price">
                <p className="SDA-info-p">${spot.price}<small className="SDA-priceNight">/night</small></p>
              </div>
            </div>
            {(isHovered.id === spot.id) && <div className='tooltip'>
              <p className="tooltipbox"><small>{spot.name}</small></p>
            </div>}
          </div>
        )
      })}
    </div>
  );
}

export default SpotsDisplayPage;
