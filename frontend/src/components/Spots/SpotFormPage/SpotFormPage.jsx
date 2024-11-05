import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import * as spotActions from '../../../store/spots';
import './SpotFormPage.css';

function SpotFormPage () {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const latitude = 90.00;
  const longitude = 90.00;
  const [imageFiles, setImageFiles] = useState([]);
  const [file, setFile] = useState({
    previewImage: '',
  });
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    name: "",
    lat: "",
    lng: "",
    description: "",
    price: "",
  });

  const addImageFile = (e) => {
    e.preventDefault();

    setImageFiles(() => {
      let retArr = [...imageFiles];
      retArr.push(
        <div className='SFP-div-inputSpotForm'>
          <input type="file" className='SFP-fileUpload' value={file[`image0${imageFiles.length + 1}`]} name={`image0${imageFiles.length + 1}`} onChange={(e) => handleChangeFile(e)}/>
        </div>
      )
      return retArr;
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { address, lng, lat, city, state, country, description, price, name} = formData;

    setErrors(() => {
      const err = {};

      if (description === "") {
        err.description = "Description is required"
      }
      if (country === "") {
        err.country = "Country is required"
      }
      if (city === "") {
        err.city = "City is required"
      }
      if (state === "") {
        err.state = "State is required"
      }
      if (price === "") {
        err.price = "Price is required"
      }
      if (address === "") {
        err.address = "Address is required"
      }
      if (name === "") {
        err.name = "Name is required"
      }
      if (description !== "" && description.length < 30) {
        err.description = "Description must be at least 30 characters"
      }
      if (!file.previewImage) {
        err.previewImage = "PreviewImage is required"
      }

      return err;
    })

    if (Object.keys(errors).length > 0) {
      return; // Prevent dispatch if there are validation errors
    }

    try {
      const response = await dispatch(spotActions.createSpot({
          address,
          city,
          state,
          country,
          name,
          lat: lat !== "" ? lat : latitude,
          lng: lng !== "" ? lng : longitude,
          description,
          price,
      }));

      if (response.errors) {
          setErrors(() => {
              const err = {};
              for (let key in response.errors) {
                  err[key] = response.errors[key];
              }
              return err;
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          const respone02 = await dispatch(spotActions.addSpotImage({ file: file.previewImage, spotId: response.id }));
          
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleChangeFile = (e) => {
    const { name, value } = e.target;

    setFile({
      ...file,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  return (
    <div className='outerDiv-spotForm'>
      <div className="div-spotForm">
        <h2>Create New Spot</h2>
        <form className="spotForm" onSubmit={(e) => handleSubmit(e)}>
          <div className='SFP-div-formSection'>
            <h4 className='SF-title'>Where's your place located?</h4>
            <p className="SF-caption"><small>Guests will only get your exact address once they booked a reservation.</small></p>

            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">Address</label> 
              <input type="text" name="address" className="SFP-formInput" value={formData.address} onChange={(e) => handleChange(e)}/>
              {errors.address && <p className='SFL-Error'><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.address}</p>}
            </div>

            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">City</label> 
              <input type="text" name="city" className="SFP-formInput" value={formData.city} onChange={(e) => handleChange(e)}/>
              {errors.city && <p className='SFL-Error'><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.city}</p>}
            </div>
            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">State</label> 
              <input type="text" name="state" className="SFP-formInput" value={formData.state} onChange={(e) => handleChange(e)}/>
              {errors.state && <p className='SFL-Error'><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.state}</p>}
            </div>

            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">Country </label> 
              <input type="text" value={formData.country} name="country" className="SFP-formInput" onChange={(e) => handleChange(e)}/>
              {errors.country && <p className="SFL-Error"><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.country}</p>}
            </div>

            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">Latitude</label> 
              <input type="text" name="lat" className="SFP-formInput" value={formData.lat} onChange={(e) => handleChange(e)}/>
              {errors.lat && <p className="SFL-Error"><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.lat}</p>}
            </div>
            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">Longitude</label> 
              <input type="text" name="lng" className="SFP-formInput" value={formData.lng} onChange={(e) => handleChange(e)}/>
              {errors.lng && <p className="SFL-Error"><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.lng}</p>}
            </div>
          </div>

          <div className='SFP-div-formSection'>
            <h4 className='SF-title'>Describe your place to guests</h4>
            <p className="SF-caption"><small>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</small></p>

            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">Description</label> 
              <textarea name="description" className="SFP-formInput07" value={formData.description} onChange={(e) => handleChange(e)}
              placeholder='Please write at least 30 characters'></textarea>
              {errors.description && <p className='SFL-Error'><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.description}</p>}
            </div>
          </div>

          <div className='SFP-div-formSection'>
            <h4 className='SF-title'>Create a title for your spot</h4>
            <p className="SF-caption"><small>Catch guests' attention with a spot title that highlights what makes your place special.</small></p>

            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">Name</label> 
              <input type="text" name="name" className="SFP-formInput" value={formData.name} onChange={(e) => handleChange(e)}/>
              {errors.name && <p className='SFL-Error'><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.name}</p>}
            </div>
          </div>

          <div className='SFP-div-formSection'>
            <h4 className='SF-title'>Set a base price for yout spot</h4>
            <p className="SF-caption"><small>Competitive pricing can help your listing stand out and rank higher in search results.</small></p>

            <div className="SFP-div-inputSpotForm">
              <label className="SFP-inputLabel">Price</label> 
              <input type="text" name="price" className="SFP-formInput" value={formData.price} onChange={(e) => handleChange(e)}
              placeholder='Price per night (USD)'/>
              {errors.price && <p className='SFL-Error'><FontAwesomeIcon icon={faExclamationTriangle}/> {errors.price}</p>}
            </div>
          </div>

          <div className='SFP-div-formSection'>
            <h4 className='SF-title'>Liven up your spot with photos</h4>
            <p className="SF-caption"><small>Submit a link to at least one photo to publish your spot.</small></p>
              <div className="SFP-div-inputSpotForm">
                <input type="file" className='SFP-fileUpload' value={file.previewImage} name="previewImage" onChange={(e) => handleChangeFile(e)}/>
                {errors.previewImage && <p className='SFL-Error'><FontAwesomeIcon icon={faExclamationTriangle}/>{errors.previewImage}</p>}
              </div>
              {imageFiles && imageFiles.map((data) => data)}
              <button onClick={(e) => addImageFile(e)} disabled={imageFiles.length > 3}>Add Image</button>
          </div>


          <div className="SFP-div-inputSpotForm div-ISF-button">
            <button type="submit" className="spotFormButton">Create Spot</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SpotFormPage;