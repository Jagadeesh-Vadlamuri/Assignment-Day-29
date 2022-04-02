import React from 'react';
import Sidebar from './Sidebar';
import Bodysection from './Bodysection';
import axios from 'axios';

const Homepage = () => {
  return (
    <div id="wrapper">
     
        <Sidebar />
        <Bodysection />
    </div>
  )
}

export default Homepage