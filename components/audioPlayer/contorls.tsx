import { Pause, Play, SkipBack, SkipForward } from "phosphor-react";
import { useEffect, useState } from "react";

interface IControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  increaseTrack: (increament?: number) => void;
}

export default function Controls({ audioRef, increaseTrack }: IControlsProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(!audioRef.current?.pause || false);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleLoadedMetadata = () => {
      setDuration(Math.floor(audioRef.current?.duration || 0));
    };

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audioRef.current?.currentTime || 0));
    };

    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef]);

  const onTimelineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = parseInt(event.target.value);
  };

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume, audioRef]);

  const onPlayPauseClick = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setPlaying(true);
    } else {
      audioRef.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center w-full mb-5">
        <div className="relative w-full max-w-md">
          {/* CURRENT TIME BAR */}
          <div
            style={{
              background: `linear-gradient(to right, rgb(0 55 129) ${Math.floor(
                (currentTime / duration) * 100
              )}%, rgb(226 232 240) ${Math.floor(
                (currentTime / duration) * 100
              )}%, rgb(226 232 240) 100%)`,
            }}
            className="w-full h-2 rounded-full -top-[0.125rem] left-0 flex justify-start items-center"
          />
          {/* BALL */}
          <div
            style={{
              left: `${Math.floor((currentTime / duration) * 100)}%`,
            }}
            className="absolute top-[50%] w-4 h-4 bg-blue border-2 rounded-full -translate-x-[50%] -translate-y-[50%] pointer-events-none shadow-lg"
          />
          {/* HIDDEN INPUT */}
          <input
            type="range"
            step="1"
            max={duration}
            onChange={onTimelineChange}
            value={currentTime}
            className="absolute w-full -top-[100%] left-0 opacity-0 cursor-pointer"
          />
          <div />
        </div>
      </div>

      <div className="grid grid-cols-12 w-full gap-1 p-1">
        <div className="col-span-6 col-start-4 flex justify-around items-center text-white [&>*]:rounded-full [&>*]:p-3 [&>*]:mx-1 [&>*]:bg-blue [&>*]:border-2">
          <button onClick={() => increaseTrack(-1)}>
            <SkipBack weight="fill" />
          </button>
          <button onClick={onPlayPauseClick}>
            {playing ? <Pause weight="fill" /> : <Play weight="fill" />}
          </button>
          <button onClick={() => increaseTrack()}>
            <SkipForward weight="fill" />
          </button>
        </div>

        {/* <div className="col-start-10 col-span-3 flex justify-center items-center">
          <input
            type="range"
            step="0.1"
            max="1"
            onChange={onVolumeChange}
            value={volume}
          />
        </div> */}
      </div>
    </div>
  );
}
