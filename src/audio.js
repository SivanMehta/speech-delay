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

async function getStream() {
    return navigator.mediaDevices.getUserMedia({ audio: true });
}

async function toggle(audio, setAudio) {
    if(!audio.playing) {
       const stream = await getStream();
       const context = new AudioContext();
       const microphone = context.createMediaStreamSource(stream);
       microphone.connect(context.destination);
       setAudio({
            microphone,
            playing: true
       })
    } else {
        audio.microphone.disconnect();
        setAudio({
            microphone: null,
            playing: false
        })
    }
}

export default function Audio({ delay, setDelay }) {
    const [ enabled, setEnabled ] = useState(true);
    const [ audio, setAudio ] = useState({
        microphone: null,
        playing: false
    });

    const checkPermissions = async () => {
        const stream = await getStream();
        if(!stream) {
            setEnabled(false)
        }
    }

    useEffect(async () => {
        checkPermissions();
    });

    if(!enabled) {
        return (
            <>Please enable this device's microphone</>
        )
    }

    const text = (audio.playing ? 'Stop' : 'Start') + ' playback';

    return (
        <>
            <Slider delay={delay} setDelay={setDelay} />
            <button href="#" role = "button" onClick={ () => toggle(audio, setAudio) }>{ text }</button>
        </>
    )

}