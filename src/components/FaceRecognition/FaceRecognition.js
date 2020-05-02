import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputimage' alt='' src={imageURL} width='600px' hight='auto'/>
                <div className='bounding-box' 
                style={{top: box.top, right: box.right, 
                left: box.left, bottom: box.bottom}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;