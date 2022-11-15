import React, { useEffect, useState } from 'react';

function Audio() {
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
        source.play();
    }

    return (
        <>
            <button onClick={ play }>play audio</button>
        </>
    )

}