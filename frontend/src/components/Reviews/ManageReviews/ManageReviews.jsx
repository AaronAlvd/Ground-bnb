import './ManageReviews.css';
import * as reviewActions from '../../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ManageReviews() {
  const reviews = useSelector((state) => state.reviews.reviews)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        await Promise.all([     
          dispatch(reviewActions.getReviews()),     
        ]);
      } catch (err) {
        console.error(err)
      }
    };
  
    fetchSpots();
  }, [dispatch]);

  const showReviews = () => {
    if (!reviews) {
      return null
    } else {
      return reviews.length > 1 ? 
        reviews.map((review) => {
          const createdAt = new Date(review.createdAt);
          const traditionalDate = createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <div className="div-spotReview">
              <div className="div-reviewTop">
                <h3 className="reviewTop">{review.User.firstName} {review.User.lastName}</h3><h3 className="reviewTop">{review.stars}<FontAwesomeIcon className="SD-icon"icon={faStar}/></h3>
              </div>
              <small>{traditionalDate}</small>
              <p>{review.review}</p>
            </div>
          )
        }) : 
        (<div className="div-spotReview">
          <h3>{reviews[0].User.firstName}</h3>
        </div>)
    }
  }

  return (
    <div>
      {showReviews()}
    </div>
  )
}

export default ManageReviews;