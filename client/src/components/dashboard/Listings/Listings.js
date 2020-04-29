import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';
import { Button, Modal, Alert, ButtonGroup } from 'react-bootstrap';

function Listings() {
  const [listings, setListings] = useState({ result: [] });
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('all');
  const [filterText, setFilterText] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [selectedListing, setListing] = useState({
    id: 0,
    title: ''
  });
  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchData = async () => {
      getAll();
    };
    fetchData();
  }, []);

  const getAll = () => {
    let params = {};
    if (filter.length && filter !== 'all') params['filter'] = filter;
    if (filterText) params['term'] = filterText;
    var esc = encodeURIComponent;
    var query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&');

    axios
      .get('/api/listings/get-all?' + query)
      .then(function(response) {
        setListings(response.data)
      })
      .catch(err =>
        console.log(err)
      );
  }

  const openDeleteModal = (item) => {
    setShow(true);
    setListing({
      id: item._id,
      title: item.title
    });
  }

  const deleteListing = () => {
    axios
      .post('/api/listings/delete?id=' + selectedListing.id)
      .then(function(response) {
          handleListingChange();
          getAll();
        })
        .catch(err =>
          console.log(err)
        );
  }

  const handleListingChange = () => {
    handleClose();
    setShowMessage(true);
    setTimeout(() => { setShowMessage(false) }, 3000)
  }

  const handleFilterChange = (filterName) => {
    setFilter(filterName)
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
  }

  useEffect(() => {
    getAll()
  }, [filterText, filter])

  return (
    <div>
      <div className="d-flex">
        <div className="flex-1"><h1>Listings</h1></div>
        <div className="flex-1 text-right">
          <Link to="/dashboard/listings/create" className="btn btn-info">+ Create Listing</Link>
        </div>
      </div>

      <div className="pt-3">
      <div className="d-flex">
        <div className="flex-1">
          <input placeholder="search..." className="form-control mb-2" onChange={ handleFilterTextChange } />
        </div>
        <div className="flex-1 text-right">
          <ButtonGroup>
            <Button onClick={ () => handleFilterChange('all') } variant={ filter === 'all' ? 'secondary' : 'light' }>All</Button>
            <Button onClick={ () => handleFilterChange('active') } variant={ filter === 'active' ? 'secondary' : 'light' }>Active</Button>
            <Button onClick={ () => handleFilterChange('sold') } variant={ filter === 'sold' ? 'secondary' : 'light' }>Sold</Button>
          </ButtonGroup>
        </div>
      </div>

        { showMessage && <Alert variant={'success'}>{ selectedListing.title } deleted</Alert> }
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Date Added</th>
              <th scope="col">Sold</th>
              <th scope="col">Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { listings.result.map((item, index) => (
              <tr key={index}>
                 <td>{ item.title }</td>
                 <td>{ item.description }</td>
                 <td>${ item.price }</td>
                 <td><Moment date={item.dateAdded} format="MM-DD-YYYY" /></td>
                 <td>{ item.sold.toString() }</td>
                 <td>{ item.active.toString() }</td>
                 <td className="text-right table-actions">
                   { /* todo append id to url*/  }
                   <Link to={{ pathname: '/dashboard/listings/create', state: { listing: item } }}>✎</Link>
                  <span className="ml-3" onClick={ () => openDeleteModal(item) }>×</span>
                </td>
              </tr>
            )) }
          </tbody>
        </table>

        <div>
          <span>Total: { listings.total }</span>
        </div>

        { !listings.result && !listings.length && <div className="text-center mt-3">No Items</div> }
      </div>

      { show && <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete { selectedListing.title }?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="danger" onClick={ deleteListing }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>}
    </div>
  )
}

export default Listings;
