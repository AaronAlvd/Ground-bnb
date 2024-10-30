import { useDispatch } from 'react-redux';
import * as reviewActions from '../../../store/review';

function DeleteReviewConfirm({ reviewId }) {
  const dispatch = useDispatch();
  
  const deleteReview = async () => {
    try {
      const response = await dispatch(reviewActions.deleteReview(reviewId));

      if (!response.ok) {
        throw new Error('Failed to delete review')
      }

      const data = await response.json();
      window.location.reload();

    } catch(err) {
      console.error('Failed to delete review', err);
    }
  }

  return (
      <div className="div-CDS">
        <h2>Confirm Delete</h2>
        <p className="CDS-P">Are you sure you want to delete this review?</p>
        <button className='CDS-button' onClick={deleteReview}>Yes</button>
        <button className='CDS-button-NO'>No</button>
      </div>
  )
}

export default DeleteReviewConfirm;