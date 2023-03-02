import StrapiImage from "@components/strapiImage";
import { ITrack } from ".";

interface IDisplayTrackProps {
  currentTrack: ITrack;
}

export default function DisplayTrack({ currentTrack }: IDisplayTrackProps) {
  return (
    <>
      <div className="px-10">
        <StrapiImage image={currentTrack.image} className="shadow-lg" />
      </div>
      <h3 className="my-5 text-center">{currentTrack.title}</h3>
    </>
  );
}
