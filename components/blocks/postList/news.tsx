import StrapiImage from "@components/strapiImage";
import { INewsArticle } from "@libs/types";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";

interface INewsProps {
  newsArticles: INewsArticle[];
  pageUrl: string;
}

export default function News({ newsArticles, pageUrl }: INewsProps) {
  const newsArticlesExist = newsArticles && newsArticles.length;
  return (
    <>
      <h1 className="mb-3">News</h1>
      {newsArticlesExist ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {newsArticles.map((article) => (
            <li key={article.id} className="group">
              <Link
                href={pageUrl + "/" + article.attributes.slug}
                className="w-ful h-full flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square w-full overflow-hidden relative flex justify-center items-center mb-2">
                    <StrapiImage
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      image={article.attributes.mainImage.data}
                    />
                  </div>
                  <h5 className="mb-1 inline-block relative">
                    {article.attributes.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue group-hover:w-full transition-all duration-300" />
                  </h5>
                  <LinesEllipsis
                    className="font-serif mb-1 text-sm"
                    text={article.attributes.description || ""}
                    maxLine="3"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </div>
                <div className="text-end">hello</div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No news</div>
      )}
    </>
  );
}
