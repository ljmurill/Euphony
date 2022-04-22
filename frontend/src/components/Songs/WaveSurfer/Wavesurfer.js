import React, {useRef, useEffect} from "react";
import WaveSurfer from 'wavesurfer.js';


// 'https://d3b4kmpqmm0e8t.cloudfront.net/d75bf8d3bee14e4397cfcbae66e5ff32.mp3'
// https://euphony.s3.amazonaws.com/1650515865150.mp3
function WaveForm({song, play, setPlay}) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);


    const formWaveSurferOptions = ref => ({
        container: ref,
        waveColor: "#eee",
        progressColor: "rgb(113, 62, 172)",
        barWidth: 2.5,
        barRadius: 2,
        responsive: true,
        height: 100,
        partialRender: true,
        // fillParent: false,
        pixelRatio: 1,
        // normalize: true,
        interact: true,
        hideScrollbar: true,
        autoCenter: true,
        // backend: 'MediaElement'
        // xhr: {
        //     cache: "default",
        //     // mode: "no-cors",
        //     method: "GET",
        //     credentials: "include",
        //     headers: [
        //       { key: "cache-control", value: "no-cache" },
        //       { key: "pragma", value: "no-cache" }
        //     ]
        //   }
        // xhr:{credentials: 'same-origin', mode: 'no-cors'}
      });




    useEffect(() => {
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);

        wavesurfer.current.load(song)
        // wavesurfer.drawBuffer()
        wavesurfer.current.on("ready", function() {
        // https://wavesurfer-js.org/docs/methods.html
            wavesurfer.current.setVolume(0.5);
            // wavesurfer.current.pause()
            // wavesurfer.current.play()

        });
        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [song]);

    useEffect(() => {
        if (wavesurfer.current){
            wavesurfer.current.on('finish', () => {
                wavesurfer.current.stop()
                setPlay(false)
            })
        }
    })

    if(wavesurfer.current){

        if(play){
            wavesurfer.current.play()
        }else{
            wavesurfer.current.pause()
        }


    }



    return <div id='waveform' ref={waveformRef}></div>;
}

export default WaveForm
