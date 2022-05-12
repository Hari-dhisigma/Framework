

import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
function Sample() {

  function Test(e){
    
    e.preventDefault();

      axios
      .get('http://localhost:8000/test1')
      .then(function (res) {
        console.log(res.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
}

  return (
    <div className='containerLog'>
        <div className='formLog'>
        <Form>
  <Button variant="primary" type="submit" onClick={(e)=>Test(e)}>
    Login
  </Button>

</Form>
    </div>
    </div>
  );
}

export default Sample;
