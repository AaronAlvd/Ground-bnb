import * as spotActions from "../../../store/spots"; 
import * as bookingActions from '../../../store/booking';
import * as reviewActions from '../../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import ReserveCalendar from "./ReserveCalendar/ReserveCalendar";
import ReviewForm from '../../Reviews/ReviewForm/ReviewForm';
import DeleteReviewConfirm from '../../Reviews/ManageReviews/DeleteReviewConfirm';
import "./SpotDetailPage.css";


function SpotDetailPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.spots);
  const user = useSelector((state) => state.session.user)
  const bookings = useSelector((state) => state.bookings.bookings)
  const spot = spots.find((spot) => spot.id === Number(spotId));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [owner, setOwner] = useState(false);
  const reviews = useSelector((state) => state.reviews.reviews);
  const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const showReviewButton = reviews.find((review) => user && review.userId === user.id);
  const spotImages = spot.spotImages


  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      setError(null);

      try {
        if (user) {
          await Promise.all([
            dispatch(spotActions.getSpots()),
            dispatch(reviewActions.getReviews()),
            dispatch(reviewActions.getSpotReviews(spotId)),
            dispatch(bookingActions.getBookings())
          ]);
        } else {
          dispatch(spotActions.getSpots()),
          dispatch(reviewActions.getSpotReviews(spotId))
        }
      } catch (err) {
        setError("Failed to load spots or bookings.");  // General error message
      } finally {
        setLoading(false);  // Reset loading state once done
      }
    };
  
    fetchSpots();
  }, [dispatch]);  // Dependencies: re-run on `spotId` or `dispatch` change

  useEffect(() => {
    if (!showReviewButton && user && spot.ownerId !== user.id) {
      setShowReview(true);
    } else {
      setShowReview(false);
    }

  }, [showReview, bookings, spotId, showReviewButton]);

  useEffect(() => {
    if (user && spot && (spot.ownerId === user.id)) {
      setOwner(true);
    }
  },[owner, spot, user]);

  const showReviews = () => {
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
            <div className="div-spotReview" key={review.id}>
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
              {(user && user.id === review.User.id) && <button className='SD-deleteReviewButton'>
                <OpenModalButton buttonText="Delete Review" modalComponent={<DeleteReviewConfirm reviewId={review.id}/>}/>
              </button>}
            </div>
          )
        }) : <h3>Be the first to post a review!</h3>

    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!spot) return <div>Spot not found.</div>;

  return (
      <div className="SpotDetailPage-div">
        <div className="div-title">
          <h2 className="spotTitleName">{spot.name}</h2>
          <p className="spotTitlePlace">{spot.city}, {spot.state}, {spot.country}</p>
        </div>
        <div className="div-pictures">
          {spotImages.map((data) => {
            if (data.preview) {
              const byteArray = new Uint8Array(data.file.data);
              const binaryString = Array.from(byteArray)
                  .map(byte => String.fromCharCode(byte))
                  .join('');
              return <img className="mainImage"src={`data:image/jpeg;base64,${btoa(binaryString)}`}/> // Ensure you use the correct MIME type 
            }
          })}
          <div className="div-sideImages">
          {spotImages.map((data) => {
            if (spotImages.indexOf(data) > 3) {
              return 
            } else if (!data.preview){
              const byteArray = new Uint8Array(data.file.data);
              const binaryString = Array.from(byteArray)
                .map(byte => String.fromCharCode(byte))
                .join('');
              return <img className="sideImage"src={`data:image/jpeg;base64,${btoa(binaryString)}`}/> // Ensure you use the correct MIME type
            }
          })}
          </div>
        </div>
        <div className="div-body">
          <div className="div-upperBody">
            <div className="div-upperBodyLeft">
              <div className="spotDescription">
                <h3 className="SD-host">Hosted by Aaron Alvarado</h3>
                <p>{spot.description}</p>
              </div>
            </div>
            <div className="div-upperBodyRight">
              <div className="div-spotReserve">
                <div className="div-spotReserveTop">
                  <div className="div-SRT-left">
                    <span className="spotReserve"><p className="spotReserve SR-price">${spot.price}</p><small className="SD-subscript">night</small></span>
                  </div> 

                  <div className="div-SRT-right">
                      {spot.avgRating ? ( <p className="spotReserve"> 
                        <FontAwesomeIcon className="SD-icon" icon={faStar}/>{spot.avgRating.toFixed(2)}</p>) : 
                        (<p className="spotReserve"> New <FontAwesomeIcon className="SD-icon" icon={faStar} /></p>)}
                          {reviews.length !== 0 && (<> <p className="centered-DOT">•</p> <p className="spotReserve">
                          {reviews.length} {reviews.length !== 1 ? "Reviews" : "Review"}</p></>
                          )}
                      </div> 
                  </div>

                  <div className="SpotDetailPage-div-reserveCalender">
                    <OpenModalButton buttonText="Reserve" modalComponent={<ReserveCalendar />}/>
                  </div>
              </div>
              <div className="div-SD-buttons">
                {showReview && <button className="SD-Button">
                  <OpenModalButton buttonText="Post Your Review" modalComponent={<ReviewForm props={spot}/>}/>
                </button>}
              </div>
            </div>
          </div>
          <div className="div-lowerBody">
            <div className="div-lowerBodyTitle">
              {spot.avgRating ? <p className="LB-Reviews"><FontAwesomeIcon className="SD-icon"icon={faStar}/>{spot.avgRating.toFixed(2)}</p> : <p className="LB-Reviews"><FontAwesomeIcon className="SD-icon"icon={faStar}/>New</p>}
              {reviews.length !== 0 && <><p className="centered-DOT">•</p><p className="LB-Reviews">{reviews.length } {reviews.length != 1 ? "Reviews" : "Review"}</p></>}
            </div>
            <div className="div-lowerBodyReviews">
              {showReviews()}
            </div>
          </div>
        </div>
      </div>
  );
}

export default SpotDetailPage;
