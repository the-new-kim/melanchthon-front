import { IEvent } from "@libs/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IEventsProps {
  events: IEvent[];
  pageUrl: string;
}

interface IEventListProps extends IEventsProps {
  listTitle: string;
}

const EventList = ({ listTitle, events, pageUrl }: IEventListProps) => {
  const { asPath, locale } = useRouter();

  return (
    <div className="mb-10">
      <h1>{listTitle}</h1>
      <ul>
        <li className="grid grid-cols-3 font-bold border-b-blue border-b-solid border-b-2 p-3">
          <div>{locale === "de" ? "Datum" : "Date"}</div>
          <div>{locale === "de" ? "Veranstaltungen" : "Events"}</div>
          <div>{locale === "de" ? "Veranstaltungsort" : "Location"}</div>
        </li>
        {events.map((event) => (
          <li
            key={event.id}
            className="grid grid-cols-3 p-3 border-b-blue border-b-solid border-b-[1px]"
          >
            <div>
              {new Date(event.attributes.eventDate).toLocaleDateString(
                "de-DE",
                {
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
            </div>
            <div>
              <Link href={pageUrl + "/" + event.attributes.slug}>
                <div>{event.attributes.title}</div>
                <div>{event.attributes.description}</div>
              </Link>
            </div>
            <div>{event.attributes.location}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Events({ events, pageUrl }: IEventsProps) {
  const { locale } = useRouter();
  const [showing, setShowing] = useState(false);
  const [upcoming, setUpcoming] = useState<IEvent[]>([]);
  const [past, setPast] = useState<IEvent[]>([]);

  useEffect(() => {
    setUpcoming(
      events.filter(
        (event) => new Date(event.attributes.eventDate).getTime() > Date.now()
      )
    );
    setPast(
      events.filter(
        (event) => new Date(event.attributes.eventDate).getTime() < Date.now()
      )
    );
  }, [events]);

  const toggleShowing = () => {
    setShowing((prev) => !prev);
  };

  return (
    <>
      <button className="mb-10" onClick={toggleShowing}>
        {showing ? "upcoming" : "past"}
      </button>
      {!showing ? (
        <EventList
          listTitle={locale === "de" ? "Übersicht" : "Upcoming Events"}
          events={upcoming}
          pageUrl={pageUrl}
        />
      ) : (
        <EventList
          listTitle={
            locale === "de" ? "Vergangene Veranstaltungen" : "Past Events"
          }
          events={past}
          pageUrl={pageUrl}
        />
      )}
    </>
  );
}
