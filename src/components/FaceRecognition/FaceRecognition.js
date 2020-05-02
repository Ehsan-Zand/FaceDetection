import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageURL, box}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputimage' alt='' src={imageURL} width='600px' hight='auto'/>
                {box.map((element,i) => 
                    <div className='bounding-box' key={i} style={{top: element.top, right: element.right, 
                    left: element.left, bottom: element.bottom}}></div>)
                }
            </div>
        </div>
    );
}

export default FaceRecognition;