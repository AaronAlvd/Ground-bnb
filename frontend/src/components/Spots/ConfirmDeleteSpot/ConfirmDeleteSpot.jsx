import './ConfirmDeleteSpot.css';
import * as spotActions from '../../../store/spots';
import { useModal } from '../../../context/modal'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ConfirmDeleteSpot({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteSpot = () => {
    return dispatch(spotActions.deleteSpot(spotId))
    .then(() => {
      closeModal
      Navigate('/');
    })
  };

  return (
    <div className="div-CDS">
      <h2>Confirm Delete</h2>
      <p className="CDS-P">Are you sure you want to remove this spot?</p>
      <button className='CDS-button' onClick={deleteSpot}>Yes</button>
    </div>
  );
}

export default ConfirmDeleteSpot;
