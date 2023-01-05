import StrapiImage from "@components/strapiImage";
import { INewsArticle } from "@libs/types";
import Link from "next/link";
import { useRouter } from "next/router";

interface INewsProps {
  newsArticles: INewsArticle[];
}

export default function News({ newsArticles }: INewsProps) {
  const { asPath } = useRouter();
  const newsArticlesExist = newsArticles && newsArticles.length;
  return (
    <>
      {newsArticlesExist ? (
        <ul>
          {newsArticles.map((article) => (
            <li key={article.id}>
              <Link href={asPath + "/" + article.attributes.slug}>
                {/* <div className="w-full h-20 overflow-hidden relative flex justify-center items-center mb-5">
                  <StrapiImage
                    className="object-contain w-full h-full"
                    image={article.attributes.mainImage.data}
                  />
                </div> */}
                <span>{article.attributes.title}</span>
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
