import axios from "axios";
import { Redirect } from 'react-router-dom';

export const createOrEdit= (listing) => {
  console.log(listing)
  axios
    .post("/api/listings/create", listing)
    .then(res => {
      return res;
      console.log('listing something')
    }) // re-direct to login on successful register
    .catch(err =>
      console.log(err)
    );
};
