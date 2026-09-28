import { useRef, useState } from 'react';

const audioSrc = '/audio/home-summary.mp3';

export default function HomeAudioSummary() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const seek = (value: string) => {
    const nextTime = Number(value);
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(nextTime)) return;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const changeSpeed = (value: number) => {
    const audio = audioRef.current;
    setPlaybackRate(value);
    if (audio) audio.playbackRate = value;
  };

  return (
    <div className="reveal-fade-up is-visible mt-5 max-w-xl">
      <p className="mb-2 text-xs font-semibold text-background-50/75">If you are busy, listen to the summary</p>
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] p-2 pr-3 backdrop-blur-sm">
      <audio
        ref={audioRef}
        // The file is 4.6 MB. "none" keeps it out of the critical path entirely; the
        // duration is read from the loadedmetadata event on first play instead.
        preload="none"
        src={audioSrc}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={() => void togglePlayback()}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal-400 text-primary-950 transition hover:bg-signal-300"
        aria-label={isPlaying ? 'Pause home page audio summary' : 'Play home page audio summary'}
      >
        <i className={`${isPlaying ? 'ri-pause-fill' : 'ri-play-fill'} text-xl`} aria-hidden="true" />
      </button>
      <input
        type="range"
        min="0"
        max={duration || 0}
        step="1"
        value={Math.min(currentTime, duration || 0)}
        onChange={(event) => seek(event.target.value)}
        className="h-2 min-w-0 flex-1 cursor-pointer accent-signal-400"
        aria-label="Audio summary progress"
      />
      <div className="flex shrink-0 overflow-hidden rounded-full border border-white/15 bg-primary-950/45 p-0.5" aria-label="Audio speed">
        {[1, 1.25].map((speed) => (
          <button
            key={speed}
            type="button"
            onClick={() => changeSpeed(speed)}
            className={`rounded-full px-2.5 py-1 text-[0.68rem] font-bold transition ${playbackRate === speed ? 'bg-signal-400 text-primary-950' : 'text-white/75 hover:text-white'}`}
            aria-pressed={playbackRate === speed}
          >
            {speed === 1 ? '1x' : '1.25x'}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
