import DispatchCalls from "../../../dispatchClass/useDispatch";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import ReserveCalendar from "./ReserveCalendar/ReserveCalendar";
import ReviewForm from '../../Reviews/ReviewForm/ReviewForm';
import ShowReviews from "./ShowReviews/ShowReviews";
import DetailPagePhotos from "./DetailPagePhotos/DetailPagePhotos";
import "./SpotDetailPage.css";


function SpotDetailPage() {
  const todaysDate = new Date().toLocaleDateString('en-US');
  const formattedDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US');
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.spots);
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.bookings.bookings)
  const spot = spots.find((spot) => spot.id === Number(spotId));
  const [loading, setLoading] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [owner, setOwner] = useState(false);
  const reviews = useSelector((state) => state.reviews.reviews);
  const showReviewButton = reviews.find((review) => user && review.userId === user.id);

  useEffect(() => {
    const dispatchCalls = new DispatchCalls(dispatch);

    if (user) {
      dispatchCalls.SpotDetailPageCalls01(spotId);
      setLoading(false)
    } else {
      dispatchCalls.SpotDetailPageCalls02(spotId);
      setLoading(false)
    }

  }, [dispatch]);

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

  if (loading) return <div>Loading...</div>;
  if (!spot) return <div>Spot not found.</div>;

  return (
      <div className="SpotDetailPage-div">
        <div className="div-title">
          <h2 className="spotTitleName">{spot.name}</h2>
          <p className="spotTitlePlace">{spot.city}, {spot.state}, {spot.country}</p>
        </div>
        <DetailPagePhotos spotImages={spot.spotImages}/>
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
                        <FontAwesomeIcon className="SD-icon" icon={faStar}/>{spot.avgRating}</p>) : 
                        (<p className="spotReserve"> New <FontAwesomeIcon className="SD-icon" icon={faStar} /></p>)}
                          {reviews.length !== 0 && (<> <p className="centered-DOT">•</p> <p className="spotReserve">
                          {reviews.length} {reviews.length !== 1 ? "Reviews" : "Review"}</p></>
                          )}
                      </div> 
                  </div>

                  <div className="SpotDetailPage-div-reserveCalender">
                    <div className="SpotDetailPage-div-date" style={{borderRight: '2px solid rgb(171,171,171)'}}>
                      <OpenModalButton buttonText="Check-In" modalComponent={<ReserveCalendar />}/>
                      <p className="SpotDetailPage-p-date"><OpenModalButton buttonText={todaysDate} modalComponent={<ReserveCalendar />}/></p>
                    </div>
                    <div className="SpotDetailPage-div-date"> 
                      <OpenModalButton buttonText="Check-Out" butmodalComponent={<ReserveCalendar />}/>
                      <p className="SpotDetailPage-p-date"><OpenModalButton buttonText={formattedDate} modalComponent={<ReserveCalendar />}/></p>
                    </div>
                  </div>
                  <button>Reserve</button>
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
              {spot.avgRating ? <p className="LB-Reviews"><FontAwesomeIcon className="SD-icon"icon={faStar}/>{spot.avgRating}</p> : <p className="LB-Reviews"><FontAwesomeIcon className="SD-icon"icon={faStar}/>New</p>}
              {reviews.length !== 0 && <><p className="centered-DOT">•</p><p className="LB-Reviews">{reviews.length } {reviews.length != 1 ? "Reviews" : "Review"}</p></>}
            </div>
            <div className="div-lowerBodyReviews">
              <ShowReviews spotId={spotId}/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SpotDetailPage;
