import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

function CreateListing(props) {
  const currentState = useSelector(state => state);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: '',
    description: '',
    price: '',
    images: '',
    sold: false,
    active: true,
    errors: {}
  })

  const createListing = () => {
    axios
      .post("/api/listings/create", input)
      .then(res => {
        props.history.push('/dashboard/listings')
        console.log('listing something')
      }) // re-direct to login on successful register
      .catch(err =>
        console.log(err)
      );
  }

  const handleInputChange = event => {
    const { name } = event.target;
    const value = event.target.name === 'sold' || event.target.name === 'active' ? event.target.checked : event.target.value;

    setInput({
      ...input,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    createListing();
  };

  return (
    <div>
      <h1 className="mb-4">Create Listing</h1>
      <form noValidate className="w-50" onSubmit={ handleSubmit }>
        <input className="form-control mb-2" name="title" placeholder="Title" error={input.errors.title} onChange={handleInputChange}  />
        <div className="custom-control custom-switch mb-3 text-right">
          <input name="active" className="custom-control-input"  type="checkbox" id="activeBox" checked={input.active} error={input.errors.active} onChange={handleInputChange}  />
          <label className="custom-control-label"  htmlFor="activeBox"> Active</label>
        </div>

        <textarea className="form-control mb-2" name="description" placeholder="Description"  error={input.errors.description} onChange={handleInputChange}></textarea>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>

          <input name="price" type="text" className="form-control" placeholder="Price" error={input.errors.price} onChange={handleInputChange}  />
        </div>

        <div className="custom-file mb-2">
          <input type="file" name="images" className="custom-file-input" id="customFile" error={input.errors.images} onChange={handleInputChange}  />
          <label className="custom-file-label" htmlFor="customFile">Add images</label>
        </div>

        <div className="d-flex mt-2">
          <div className="flex-1">
            <div className="custom-control custom-checkbox mt-2">
              <input name="sold" className="custom-control-input"  type="checkbox" id="soldBox" checked={input.sold} error={input.errors.sold} onChange={handleInputChange}  />
              <label className="custom-control-label"  htmlFor="soldBox"> mark as sold</label>
            </div>
          </div>
          <div className="flex-1 text-right">
            <button type="submit" className="btn btn-success">+ Create Listing</button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default CreateListing;
