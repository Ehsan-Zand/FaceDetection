import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import face from './face.png';

const Logo = () => {
    return (
        <div className="logo ma4 mt0">
            <Tilt className="Tilt br2 shadow-2 pointer" 
            options={{max: 55}}
            style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> 
                    <img className='mt3' alt="" src={face}/>
                    <p>Intelligent Face Detector</p>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;