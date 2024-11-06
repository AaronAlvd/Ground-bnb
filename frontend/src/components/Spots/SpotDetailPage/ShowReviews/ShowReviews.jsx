import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import * as reviewActions from '../../../../store/review';
import OpenModalButton from '../../../OpenModalButton/OpenModalButton';
import DeleteReviewConfirm from '../../../Reviews/ManageReviews/DeleteReviewConfirm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ShowReviews.css';

export default function ShowReviews(spotId) {
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.session.user);
  const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewActions.getSpotReviews(spotId))
  }, [dispatch]); 

  if (!reviews) {
    return null
  } else {
    return sortedReviews.length > 0 ? 
      sortedReviews.map((review) => {
        const createdAt = new Date(review.createdAt);
        const traditionalDate = createdAt.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        return (
          <div className="ShowReviews-div" key={review.id}>
            <div className="div-reviewTop">
              <h3 className="reviewTop">
                {review.User.firstName} {review.User.lastName}</h3><h3 className="reviewTop">
                {review.stars >= 1 ? (<FontAwesomeIcon className="SDP-faStar-review" icon={faStar}/>) : (<FontAwesomeIcon icon={farStar}/>)}
                {review.stars >= 2 ? (<FontAwesomeIcon className="SDP-faStar-review" icon={faStar}/>) : (<FontAwesomeIcon icon={farStar}/>)}
                {review.stars >= 3 ? (<FontAwesomeIcon className="SDP-faStar-review" icon={faStar}/>) : (<FontAwesomeIcon icon={farStar}/>)}
                {review.stars >= 4 ? (<FontAwesomeIcon className="SDP-faStar-review" icon={faStar}/>) : (<FontAwesomeIcon icon={farStar}/>)}
                {review.stars >= 5 ? (<FontAwesomeIcon className="SDP-faStar-review" icon={faStar}/>) : (<FontAwesomeIcon icon={farStar}/>)}
              </h3>
            </div>
            <small>{traditionalDate}</small>
            <p>{review.review}</p>
            {(user && user.id === review.User.id) && <button className='ShowReviews-deleteButton'>
              <OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewConfirm reviewId={review.id}/>}/>
            </button>}
          </div>
        )
      }) : <h3>Be the first to post a review!</h3>
    }
  }