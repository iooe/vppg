export default class AudioService {
    public static playWinSound() {
        const audio = new Audio('./win-sound.wav');

        audio.addEventListener('canplay', e => {
            audio.play();
        });
    }
}