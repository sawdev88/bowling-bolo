import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../../../actions/listingActions';
import Moment from 'react-moment';
import axios from 'axios';

function Listings() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get('/api/listings/get-all')
        .then(function(response) {
            console.log(response.data)
            setListings(response.data)
          })
          .catch(err =>
            console.log(err)
          );
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex">
        <div className="flex-1"><h1>Listings</h1></div>
        <div className="flex-1 text-right">
          <Link to="/dashboard/listings/create" className="btn btn-info">+ Create Listing</Link>
        </div>
      </div>

      <div>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Date Added</th>
              <th scope="col">Sold</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { listings.map((item, index) => (
              <tr key={index}>
                 <td>{ item.title }</td>
                 <td>{ item.description }</td>
                 <td>${ item.price }</td>
                 <td><Moment date={item.dateAdded} format="MM-DD-YYYY" /></td>
                 <td>{ item.sold.toString() }</td>
                 <td className="text-right">view edit delete</td>
              </tr>
            )) }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Listings;
