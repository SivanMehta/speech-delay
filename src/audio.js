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

export default function Audio() {
    const context = new AudioContext();
    const source = context.createBufferSource();

    const loadNoise = async () => {
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

    useEffect(async () => {
        loadNoise();
    })

    function play() {
        source.start();
    }

    const [ delay, setDelay ] = useState(0);

    return (
        <>
            <Slider delay={delay} setDelay={setDelay} />
            <button onClick={ play }>Start playback</button>
        </>
    )

}