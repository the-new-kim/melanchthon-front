import GridCard, { IGridCardProps } from "@components/shared/gridCard";
import { INewsArticle } from "@libs/types";
import GridLayout from "@components/shared/gridLayout";
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
        <GridLayout>
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
        </GridLayout>
      ) : (
        <div>No news</div>
      )}
    </>
  );
}
