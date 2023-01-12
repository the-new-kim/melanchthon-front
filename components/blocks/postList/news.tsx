import GridCard, { IGridCardProps } from "@components/shared/gridCard";
import { INewsArticle } from "@libs/types";
import PageTitle from "@components/shared/pageTitle";

interface INewsProps {
  newsArticles: INewsArticle[];
  pageUrl: string;
}

export default function News({ newsArticles, pageUrl }: INewsProps) {
  const newsArticlesExist = newsArticles && newsArticles.length;
  return (
    <>
      <PageTitle>News</PageTitle>
      {newsArticlesExist ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {newsArticles.map((article) => {
            const props: IGridCardProps = {
              text: {
                title: article.attributes.title,
                description: article.attributes.description || "",
              },
              image: article.attributes.mainImage.data,
              href: pageUrl + "/" + article.attributes.slug,
            };

            return (
              <li key={article.id + "news"}>
                <GridCard {...props} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No news</div>
      )}
    </>
  );
}
