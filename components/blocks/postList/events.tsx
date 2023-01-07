import Card from "@components/shared/card";
import GridCard, { IGridCardProps } from "@components/shared/gridCard";

import { IEvent } from "@libs/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageTitle from "@components/shared/pageTitle";
import SectionTitle from "@components/shared/sectionTitle";

interface IEventsProps {
  events: IEvent[];
  pageUrl: string;
}

export default function Events({ events, pageUrl }: IEventsProps) {
  const { locale } = useRouter();
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

  return (
    <>
      <PageTitle>{locale === "de" ? "Veranstaltungen" : "Events"}</PageTitle>

      {/* CURRENT EVENTS */}
      {upcoming && upcoming.length ? (
        <>
          <SectionTitle>
            {locale === "de" ? "Übersicht" : "Upcoming Events"}
          </SectionTitle>
          <ul>
            {upcoming.map((event) => {
              const props = {
                title: event.attributes.title,
                description: event.attributes.description,
                href: pageUrl + "/" + event.attributes.slug,
                image: event.attributes.mainImage.data,
                date: new Date(event.attributes.eventDate).toLocaleDateString(
                  "de-DE",
                  {
                    hour: "numeric",
                    minute: "numeric",
                  }
                ),
                location: event.attributes.location,
              };

              return (
                <li key={event.id} className="mb-20">
                  <Card {...props} />
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
      {/* PAST EVENTS */}
      {past && past.length ? (
        <>
          <hr className="mb-20" />
          <SectionTitle>
            {locale === "de" ? "Vergangene Veranstaltungen" : "Past Events"}
          </SectionTitle>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {past.map((event) => {
              const props: IGridCardProps = {
                text: {
                  title: event.attributes.title,
                  description: event.attributes.description,
                },
                href: pageUrl + "/" + event.attributes.slug,
                image: event.attributes.mainImage.data,
              };

              return (
                <li key={event.id + "event"}>
                  <GridCard {...props} />
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
}
