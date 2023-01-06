import { IExhibition } from "@libs/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IExhibitionsProps {
  exhibitions: IExhibition[];
  pageUrl: string;
}

interface IExhibitionListProps extends IExhibitionsProps {
  listTitle: string;
}

const ExhibitionList = ({
  listTitle,
  exhibitions,
  pageUrl,
}: IExhibitionListProps) => {
  const { asPath, locale } = useRouter();

  return (
    <div className="mb-10">
      <h1>{listTitle}</h1>
      <ul>
        <li className="grid grid-cols-3 font-bold border-b-blue border-b-solid border-b-2 p-3">
          <div>{locale === "de" ? "Datum" : "Date"}</div>
          <div>{locale === "de" ? "Veranstaltungen" : "Exhibitions"}</div>
          <div>{locale === "de" ? "Veranstaltungsort" : "Location"}</div>
        </li>
        {exhibitions.map((exhibition) => (
          <li
            key={exhibition.id}
            className="grid grid-cols-3 p-3 border-b-blue border-b-solid border-b-[1px]"
          >
            <div>
              <span>
                {new Date(exhibition.attributes.dateFrom).toLocaleDateString(
                  "de-DE"
                )}
              </span>
              <span> - </span>
              <span>
                {new Date(exhibition.attributes.dateTo).toLocaleDateString(
                  "de-DE"
                )}
              </span>
            </div>
            <div>
              <Link href={pageUrl + "/" + exhibition.attributes.slug}>
                <div>{exhibition.attributes.title}</div>
                <div>{exhibition.attributes.description}</div>
              </Link>
            </div>
            <div>{exhibition.attributes.location}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Exhibitions({
  exhibitions,
  pageUrl,
}: IExhibitionsProps) {
  const [showing, setShowing] = useState("current");
  const [upcoming, setUpcoming] = useState<IExhibition[]>([]);
  const [current, setCurrent] = useState<IExhibition[]>([]);
  const [past, setPast] = useState<IExhibition[]>([]);

  useEffect(() => {
    setUpcoming(
      exhibitions.filter(
        (event) => new Date(event.attributes.dateFrom).getTime() > Date.now()
      )
    );

    setCurrent(
      exhibitions.filter(
        (event) =>
          new Date(event.attributes.dateFrom).getTime() < Date.now() &&
          new Date(event.attributes.dateTo).getTime() > Date.now()
      )
    );

    setPast(
      exhibitions.filter(
        (event) => new Date(event.attributes.dateTo).getTime() < Date.now()
      )
    );
  }, [exhibitions]);

  return (
    <>
      <ExhibitionList
        listTitle="Upcoming"
        exhibitions={upcoming}
        pageUrl={pageUrl}
      />
      <ExhibitionList
        listTitle="Current"
        exhibitions={current}
        pageUrl={pageUrl}
      />
      <ExhibitionList listTitle="Past" exhibitions={past} pageUrl={pageUrl} />
    </>
  );
}
