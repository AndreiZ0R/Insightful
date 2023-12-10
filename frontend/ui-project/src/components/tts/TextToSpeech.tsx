import {useEffect, useState} from "react";

type TextToSpeechProps = {
    text: string
}

export default function TextToSpeech({text}: TextToSpeechProps) {
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] =
        useState<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
        setUtterance(u);

        return () => {
            synth.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        }

        if (utterance !== null) synth.speak(utterance);
        setIsPaused(false);
    };

    const handlePause = () => {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsPaused(true);
    };

    const handleStop = () => {
        const synth = window.speechSynthesis;

        synth.cancel();

        setIsPaused(false);
    };

    return (
        <div>
            <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    );
}