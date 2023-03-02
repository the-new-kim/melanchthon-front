import { AudioPlayer, ITrack } from "@components/audioPlayer";
import Modal from "@components/modal";
import StrapiImage from "@components/strapiImage";
import { IAudioGuideItem, IBlock } from "@libs/types";
import { Play } from "phosphor-react";
import { useEffect, useState } from "react";
import BlockLayout from "./blockLayout";

export interface IAudioGuideProps extends IBlock {
  items: IAudioGuideItem[];
}

export default function AudioGuide({ items }: IAudioGuideProps) {
  const [showing, setShowing] = useState(false);
  const [tracks] = useState(
    items.map((item) => {
      return {
        title: item.title,
        src: item.audio.data.attributes.url,
        image: item.thumbnail.data,
      } as ITrack;
    })
  );

  const [currentTrack, setCurrentTrack] = useState<ITrack>();

  useEffect(() => {
    setShowing(!!currentTrack);
  }, [currentTrack]);

  return (
    <BlockLayout>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setCurrentTrack({
                image: item.thumbnail.data,
                src: item.audio.data.attributes.url,
                title: item.title,
              });
            }}
            className="flex flex-col justify-center items-center group cursor-pointer"
          >
            <div className="relative">
              <StrapiImage
                image={item.thumbnail.data}
                className="w-full h-full object-cover shadow-md mb-3"
              />

              <div className="absolute inset-0 w-full h-full flex justify-center items-center text-6xl text-white opacity-0 group-hover:opacity-100 pointer-events-none duration-300 transition-opacity">
                <Play weight="fill" className="z-10" />
                <div className="absolute w-full h-full flex justify-center items-center bg-black opacity-5 " />
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              {item.title}
            </div>
          </li>
        ))}
      </ul>

      {currentTrack && (
        <Modal setShowing={setShowing} showing={showing}>
          <AudioPlayer
            tracks={tracks}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        </Modal>
      )}
    </BlockLayout>
  );
}
