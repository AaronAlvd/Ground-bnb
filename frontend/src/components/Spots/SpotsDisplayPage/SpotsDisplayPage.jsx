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
        return (
          <div className="SDP-div-SpotDiv" key={spot.id} onClick={() => handleClick(spot.id)} onMouseEnter={() => setIsHovered({ id: spot.id})} onMouseLeave={() => setIsHovered({ id: 0})}>
            <img className="SDP-img"src={spot.previewImage}/>
            <div className="SDP-div-SpotBody">
              <span className="SDA-Location"><p className="SDA-info-p">{spot.city}, {spot.state}</p>  
                {spot.avgRating ? <p className="SDA-info-p">{spot.avgRating.toFixed(2)}<FontAwesomeIcon className="SDA-icon"icon={faStar}/></p>:
                                  <p className="SDA-info-p">New<FontAwesomeIcon className="SDA-icon"icon={faStar}/></p>}
              </span>
            
              <span className="SDA-Price">
                <p className="SDA-info-p">${spot.price}<small className="SDA-priceNight">/night</small></p>
              </span>
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
