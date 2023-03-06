export let $audio_context: AudioContext = null;

export function initAudio() {
    $audio_context = new AudioContext();
}

export class Sound {
    private buffer: AudioBuffer;
    private gain: GainNode;
    private panner: StereoPannerNode;
    
    constructor(filepath: string) {
        if ($audio_context) {
            this.gain = $audio_context.createGain();
            this.panner = $audio_context.createStereoPanner();
            this.gain.connect(this.panner);
            this.panner.connect($audio_context.destination);

            this.getAudioFile(filepath).then((ab: AudioBuffer) => this.buffer = ab)
        }
    }

    private async getAudioFile(filepath: string) {
        return $audio_context.decodeAudioData(await (await fetch(filepath)).arrayBuffer());
    }

    play(gain: number = 1, pan: number = 0) {
        if (this.buffer) {
            const source = $audio_context.createBufferSource();
            source.buffer = this.buffer;
            source.connect(this.gain);
            this.gain.gain.value = gain;
            this.panner.pan.value = pan;
            source.start();
        }
    }
}