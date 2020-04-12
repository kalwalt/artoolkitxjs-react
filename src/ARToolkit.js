import React from 'react';
import ARController from '@kalwalt/artoolkitx.js';


class ARToolkit extends React.Component {


  render() {

    var interval;
    var cameraParam = './data/camera_para.dat';
    const config = {
        cameraParam: cameraParam,
        width: 640,
        height: 480
    };

    var trackable = {
      trackableType: "single_barcode",
      barcodeId: 36
    }
    console.log('I am mounted!');

    window.addEventListener('artoolkitX-loaded', () => {

      console.log('Inside the Event Listener...');
      ARController.getUserMediaARController(config).then( arController => {
        arController.addEventListener('getMarker', (trackableInfo) => {
            console.log("TrackableID: " + trackableInfo.data.trackableId + " visible");
            console.log(trackableInfo.data.transformation);
          });

        try {
             arController.start().then( () => {
                console.log("start done");
                var trackableId = arController.addTrackable(trackable);
                interval = setInterval(function() {
                  arController.process();
                }, 13);
            });
        }
        catch (e) {
            console.log(e);
        }
      });
    });

    return <div>
      <p>Testing ARtoolkitX.js</p>
    </div>;
  }
}

export default ARToolkit;
