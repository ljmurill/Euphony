import React, {useRef, useEffect} from "react";
import WaveSurfer from 'wavesurfer.js';


// 'https://d3b4kmpqmm0e8t.cloudfront.net/d75bf8d3bee14e4397cfcbae66e5ff32.mp3'
// https://euphony.s3.amazonaws.com/1650515865150.mp3
function WaveForm({song}) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    console.log(song, 'asadsadas')
    // const corsIssue = async (key) => {
    //     const keyParts = key.split('/');
    //     const path = keyParts[keyParts.length - 1];
    //     console.log(key, '=================')
    //     return  'https://d3b4kmpqmm0e8t.cloudfront.net/' + path;
    // };

    const formWaveSurferOptions = ref => ({
        container: ref,
        waveColor: "#eee",
        progressColor: "rgb(113, 62, 172)",
        barWidth: 2,
        barRadius: 2,
        cursorWidth: 0,
        responsive: true,
        height: 100,
        partialRender: true,
        // fillParent: false,
        pixelRatio: 1,
        // normalize: true,
        interact: true,
        hideScrollbar: true,
        autoCenter: true,
        // mode: 'no-cors'
        xhr:{ mode: 'no-cors', method: 'GET', credentials: 'same-origin'}
      });

    // useEffect(() => {
    //     WaveSurfer.create({
    //         container: waveformRef.current,
    //     });

    // }, []);

    useEffect(() => {
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        // corsIssue('https://euphony.s3.amazonaws.com/1650515865150.mp3').then(newSong => {
        //     wavesurfer.current.load(newSong);
        // })
        // // const playSong = corsIssue(song)
        wavesurfer.current.load('https://euphony.s3.amazonaws.com/1650515865150.mp3')
        // wavesurfer.drawBuffer()
        wavesurfer.current.on("ready", function() {
        // https://wavesurfer-js.org/docs/methods.html
            wavesurfer.current.setVolume(0.5);
            // wavesurfer.current.pause()
            wavesurfer.current.play()
        });
        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [song]);

    console.log(wavesurfer.current)
    console.log(waveformRef)

    // wavesurfer.current.on("ready", function() {
    // // https://wavesurfer-js.org/docs/methods.html
    // wavesurfer.current.setVolume(0.5);
    // wavesurfer.current.play();
    // });


    return <div id='waveform' ref={waveformRef}></div>;
}

export default WaveForm
