import * as spotActions from '../store/spots';
import * as reviewActions from '../store/review';
import * as bookingActions from '../store/booking';

export default class DispatchCalls {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  SpotDetailPageCalls01(spotId) {
    this.dispatch(spotActions.getSpots())
    this.dispatch(reviewActions.getReviews()),
    this.dispatch(reviewActions.getSpotReviews(spotId)),
    this.dispatch(bookingActions.getBookings())
  }

  SpotDetailPageCalls02(spotId) {
    this.dispatch(spotActions.getSpots())
    this.dispatch(reviewActions.getSpotReviews(spotId))
  }
}