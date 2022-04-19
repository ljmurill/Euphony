import React, {useRef, useEffect} from "react";
import WaveSurfer from 'wavesurfer.js';



function WaveForm({song}) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    const corsIssue = async (key) => {
        const keyParts = key.split('/');
        const path = keyParts[keyParts.length - 1];
        console.log(key, '=================')
        return 'https://d3b4kmpqmm0e8t.cloudfront.net/' + path;
    };

    const formWaveSurferOptions = ref => ({
        container: ref,
        waveColor: "#eee",
        progressColor: "#FF4500",
        cursorColor: "OrangeRed",
        barWidth: 2,
        barRadius: 2,
        cursorWidth: 0,
        responsive: true,
        height: 100,
        partialRender: true,
        pixelRatio: 1,
        // normalize: true,
        interact: true,
        hideScrollbar: true,
        autoCenter: true,
      });

    useEffect(() => {
        WaveSurfer.create({
            container: waveformRef.current
        });

    }, []);

    useEffect(() => {
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        corsIssue(song).then(newSong => {
            wavesurfer.current.load(newSong);
        })
        wavesurfer.current.on("ready", function() {
        // https://wavesurfer-js.org/docs/methods.html
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.play();
        });
        // Removes events, elements and disconnects Web Audio nodes.
        // when component unmount
        return () => wavesurfer.current.destroy();
    }, [song]);

    console.log(wavesurfer.current)


    // wavesurfer.current.on("ready", function() {
    // // https://wavesurfer-js.org/docs/methods.html
    // wavesurfer.current.setVolume(0.5);
    // wavesurfer.current.play();
    // });


    return <div ref={waveformRef} />;
}

export default WaveForm
