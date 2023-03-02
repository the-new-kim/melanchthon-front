import { IImage } from "@libs/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Controls from "./contorls";
import DisplayTrack from "./displayTrack";

export interface ITrack {
  title: string;
  image: IImage;
  src: string;
}

interface IAudioPlayerProps {
  tracks: ITrack[];
  currentTrack?: ITrack;
  setCurrentTrack: Dispatch<SetStateAction<ITrack | undefined>>;
}

export function AudioPlayer({
  tracks,
  currentTrack = tracks[0],
  setCurrentTrack,
}: IAudioPlayerProps) {
  //   const [currentTrack, setCurrentTrack] = useState(track || tracks[0]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const increaseTrack = (increament: number = 1) => {
    const currentTrackIndex = tracks.findIndex(
      (track) => track === currentTrack
    );

    let nextTrackIndex;

    if (currentTrackIndex + increament < 0) {
      nextTrackIndex = tracks.length - 1;
    } else if (currentTrackIndex + increament > tracks.length - 1) {
      nextTrackIndex = 0;
    } else {
      nextTrackIndex = currentTrackIndex + increament;
    }

    setCurrentTrack(tracks[nextTrackIndex]);
  };

  useEffect(() => {
    // console.log(audioRef.current?.ended);

    const handleEnded = () => {
      increaseTrack();
    };
    audioRef.current?.addEventListener("ended", handleEnded);
    return () => audioRef.current?.removeEventListener("ended", handleEnded);
  }, [audioRef, currentTrack]);

  useEffect(() => {
    // audioRef.current?.play();
  }, [currentTrack]);

  return (
    <>
      <DisplayTrack currentTrack={currentTrack} />
      <audio
        ref={audioRef}
        src={currentTrack.src}
        autoPlay
        controls
        className="hidden"
      />

      <Controls audioRef={audioRef} increaseTrack={increaseTrack} />
    </>
  );
}
