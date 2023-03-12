import React from 'react';
import { Link } from 'react-router-dom';
import './Start.css';
import background from '../background.svg';


const Start: React.FC = () => {
   return (
      <div className="landing-page">
         <div className='left'>
            <h1>Welcome to Banking System</h1>
            <h3>Secure and easy way to transfer money.</h3>
            <Link to='/'>
               <button>
                  Get Started
               </button>
            </Link>
         </div>
         <div className='right'>
            <img src={background}></img>
         </div>
      </div>
   );
};

export default Start;
