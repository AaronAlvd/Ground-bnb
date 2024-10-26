import { useEffect } from "react";
import * as spotActions from "../../../store/spots"; 
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './ManageSpots.css'


function ManageSpots() {
  const spots = useSelector((state) => state.spots.spots);
  const user = useSelector((state) => state.session.user);
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
    <div>
      <ul className="ul-manageSpots">
        {user ? spots.map((spot) => {
          if (user.id === spot.ownerId) {
            return (
              <li key={spot.id} className="li-manageSpots">
                <NavLink to={`/spots/${spot.id}`}><h2>{spot.name}</h2></NavLink>
              </li>
            )
          }
        }): 
        <li>You are not signed in</li>}
      </ul>
    </div>
  )
}

export default ManageSpots;