import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
import "./imageLinkForm.css"

const ImageLinkForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [boxValues, setBoxValues] = useState({});
  const [fame, setFame] = useState('Unknown');
  const [chance, setChance] = useState('?');

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const onSubmit = () => {

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": "alicjadabr",
          "app_id": "my-first-application"
      },
    "inputs": [
      {
        "data": {
          "image": {
            "url": inputValue
          }
        }
      }
    ]
  });

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const celebrity = data.outputs[0].data.regions[0].data.concepts[0].name;
    const chances = data.outputs[0].data.regions[0].data.concepts[0].value;
    setFame(celebrity);
    setChance(chances.toString().slice(2,4));
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  const getFaceBox = (box) => {
    setBoxValues(boxValues => ({
      ...boxValues,
      ...box
    }));
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key fbea88380b9d4f78b90eaf114d3a82a9'
    },
    body: raw
  };

  fetch("https://api.clarifai.com/v2/models/celebrity-face-detection/versions/2ba4d0b0e53043f38dbbed49e03917b6/outputs", requestOptions)
  .then(response => response.json())
  .then(result => getFaceBox(calculateFaceLocation(result)))
  .catch(error => console.log('error', error));

  }

  return (
    <><div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center" type="text" value={inputValue} onChange={handleInputChange} />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
        </div>
      </div>
    </div>
    <div className='center'>
      <div className="absolute mt4">
        <img id='inputImage' alt="" src={inputValue} width='650px' heigh='auto' />
        <div className='bounding-box' style={{top: boxValues.topRow, bottom: boxValues.bottomRow, left: boxValues.leftCol, right: boxValues.rightCol}}></div>
      <div>
        <h2 className='ba b--gold pa3 br3 grow'>Result: {fame} for {chance}%</h2>
      </div>
      </div>
    </div></>
  );
}

export default ImageLinkForm;