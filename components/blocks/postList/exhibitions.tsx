import Card from "@components/shared/card";
import GridCard, { IGridCardProps } from "@components/shared/gridCard";
import PageTitle from "@components/shared/pageTitle";
import SectionTitle from "@components/shared/sectionTitle";
import { IExhibition } from "@libs/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IExhibitionsProps {
  exhibitions: IExhibition[];
  pageUrl: string;
}

interface IPostProps {
  post: IExhibition;
  pageUrl: string;
}

const Post = ({ post, pageUrl }: IPostProps) => {
  const props = {
    title: post.attributes.title,
    description: post.attributes.description,
    href: pageUrl + "/" + post.attributes.slug,
    image: post.attributes.mainImage.data,
    date: `${new Date(post.attributes.dateFrom).toLocaleDateString("de-DE", {
      hour: "numeric",
      minute: "numeric",
    })} - ${new Date(post.attributes.dateTo).toLocaleDateString("de-DE")}`,
    location: post.attributes.location,
  };

  return (
    <li className="mb-20">
      <Card {...props} />
    </li>
  );
};

export default function Exhibitions({
  exhibitions,
  pageUrl,
}: IExhibitionsProps) {
  const { locale } = useRouter();
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
          new Date(event.attributes.dateFrom).getTime() <= Date.now() &&
          new Date(event.attributes.dateTo).getTime() >= Date.now()
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
      <PageTitle>{locale === "de" ? "Ausstellungen" : "Exhibitions"}</PageTitle>

      {/* CURRENT */}
      {current && current.length ? (
        <>
          <SectionTitle>{locale === "de" ? "Aktuell" : "Current"}</SectionTitle>
          <ul>
            {current.map((post) => (
              <Post key={post.id} post={post} pageUrl={pageUrl} />
            ))}
          </ul>
        </>
      ) : null}

      {/* UPCOMING */}
      {upcoming && upcoming.length ? (
        <>
          <SectionTitle>
            {locale === "de" ? "Übersicht" : "Upcoming"}
          </SectionTitle>
          <ul>
            {upcoming.map((post) => (
              <Post key={post.id} post={post} pageUrl={pageUrl} />
            ))}
          </ul>
        </>
      ) : null}

      {/* PAST */}
      {past && past.length ? (
        <>
          <hr className="mb-20" />
          <SectionTitle>
            {locale === "de" ? "Vergangene Ausstellungen" : "Past Exhibitions"}
          </SectionTitle>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {past.map((post) => {
              const props: IGridCardProps = {
                text: {
                  title: post.attributes.title,
                  description: post.attributes.description,
                },
                href: pageUrl + "/" + post.attributes.slug,
                image: post.attributes.mainImage.data,
              };

              return (
                <li key={post.id + "event"}>
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
