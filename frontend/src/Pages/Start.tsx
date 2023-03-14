import React from 'react'
import { Link } from 'react-router-dom'
import background from '../assets/background.svg'
import './Start.css'


const Start: React.FC = () => (
   <div className="landing-page">
      <div className='left'>
         <h1>Welcome to Banking System</h1>
         <h3>Secure and easy way to transfer money.</h3>
         <Link to='/home'>
            <button>
               Get Started
            </button>
         </Link>
      </div>
      <div className='right'>
         <img src={background}></img>
      </div>
   </div>
)

export default Start
