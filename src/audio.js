import React, { useEffect, useState } from 'react';

function Slider({ delay, setDelay }) {
    const onChange = function (event) {
        setDelay(event.target.value);
    }
    return (
        <label htmlFor="range">Delay of {delay}ms
            <input
                onChange={ onChange }
                type="range"
                min="0"
                max="2"
                value={ delay }
                id="range"
                name="range"
                step="0.1"/>
        </label>
    )
}

function loadRandomNoise(context, source) {
    const audioBuffer = context.createBuffer(2, context.sampleRate * 3, context.sampleRate);
        // fill with white noise
        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
            // This gives us the actual ArrayBuffer that contains the data
            const nowBuffering = audioBuffer.getChannelData(channel);
            for (let i = 0; i < audioBuffer.length; i++) {
              // Math.random() is in [0; 1.0]
              // audio needs to be in [-1.0; 1.0]
              nowBuffering[i] = Math.random() * 2 - 1;
            }
        }

        source.buffer = audioBuffer;
        source.connect(context.destination);
}

export default function Audio({ delay, setDelay }) {
    const [ enabled, setEnabled ] = useState(false);
    const context = new AudioContext();
    let source

    const loadMicrophone = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if(stream) {
            source = context.createMediaStreamSource(stream);
            setEnabled(true);
        }
    }

    useEffect(async () => {
        loadMicrophone();
    });

    function play() {
        source.start();
    }

    if(!enabled) {
        return (
            <>Please enable this device's microphone</>
        )
    }

    return (
        <>
            <Slider delay={delay} setDelay={setDelay} />
            <button href="#" role = "button" onClick={ play }>Start Playback</button>
        </>
    )

}