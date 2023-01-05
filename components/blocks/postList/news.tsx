import StrapiImage from "@components/strapiImage";
import { INewsArticle } from "@libs/types";
import Link from "next/link";
import { useRouter } from "next/router";
// import LinesEllipsis from "react-lines-ellipsis";

interface INewsProps {
  newsArticles: INewsArticle[];
}

export default function News({ newsArticles }: INewsProps) {
  const { asPath } = useRouter();
  const newsArticlesExist = newsArticles && newsArticles.length;
  return (
    <>
      <h1 className="mb-3">News</h1>
      {newsArticlesExist ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {newsArticles.map((article) => (
            <li key={article.id} className="aspect-square">
              <Link href={asPath + "/" + article.attributes.slug}>
                <div className="w-full h-full overflow-hidden relative flex justify-center items-center">
                  <StrapiImage
                    className="object-cover w-full h-full"
                    image={article.attributes.mainImage.data}
                  />
                </div>
                <h5 className="underline">{article.attributes.title}</h5>
                {/* <LinesEllipsis
                  className="font-serif mb-1"
                  text={article.attributes.description || ""}
                  maxLine="3"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                /> */}
                <div className="text-right">Read More</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No news</div>
      )}
      <Link href="/">HOME</Link>
    </>
  );
}
