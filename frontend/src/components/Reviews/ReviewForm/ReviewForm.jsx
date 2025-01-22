import "./ReviewForm.css";
import StarRating from "../StarRating";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { createReview } from "../../../store/review";

export default function ReviewForm({props}) {
  const user = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    const safeReview = {
        review,
        userId:user.id,
        spotId:props.id,
        stars: window.rating
    };

    dispatch(createReview(safeReview));
  };

  return (
    <div className="div-reviewForm">
      <form onSubmit={handleSubmit} className="reviewForm">
        <div className="div-reviewTextbox">
          <label className="reviewForm-label">How was your stay?</label>
          <textarea value={review} className="reviewForm-textarea" onChange={(e) => setReview(e.target.value)} required placeholder="Leave your review here..."/>
        </div>

        <div className="div-reviewRating">
          <label className="reviewForm-label">Stars</label>
          <StarRating className="RF-starRating"/>
        </div>

        <div className="div-reviewButton">
          <button onSubmit={handleSubmit} className="RF-submitButton" disabled={review.length < 10 || window.rating === null} type="submit">Submit Your Review</button>
        </div>
      </form>
    </div>
  );
}
