import qs from "qs";
import { ILocale, INewsArticle, IPage } from "./types";

const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL || "http://localhost:1337/api/";

export const getLocales = async () => {
  const locales = (await (
    await fetch(`${STRAPI_BASE_URL}i18n/locales`)
  ).json()) as ILocale[];

  return locales;
};

export const getPages = async (locale: string) => {
  const query = qs.stringify(
    {
      locale,
      pagination: {
        page: 1,
        pageSize: 100, // default limit
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data } = await (
    await fetch(`${STRAPI_BASE_URL}pages?${query}`)
  ).json();

  return data;
};

export const getPagePaths = async () => {
  const locales = await getLocales();
  let allPages: IPage[] = [];

  if (!locales) return [];

  for (let i = 0; i < locales.length; i++) {
    const page = await getPages(locales[i].code);
    allPages = [...allPages, ...page];
  }

  const paths: { params: { slug: string[] }; locale: string }[] = allPages.map(
    (page) => {
      const slug = page.attributes.url
        .split("/")
        .filter((letter) => letter !== "");
      return { params: { slug }, locale: page.attributes.locale };
    }
  );

  return paths;
};

export const getNewsArticles = async (locale: string) => {
  const query = qs.stringify(
    {
      locale,
      pagination: {
        page: 1,
        pageSize: 100, // default limit
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data } = await (
    await fetch(`${STRAPI_BASE_URL}news-articles?${query}`)
  ).json();

  return data;
};

export const getNewsArticlePaths = async () => {
  const locales = await getLocales();
  let allPages: INewsArticle[] = [];

  if (!locales) return [];
  const defaultLocale = locales.find((locale) => locale.isDefault);
  for (let i = 0; i < locales.length; i++) {
    const page = await getNewsArticles(locales[i].code);
    allPages = [...allPages, ...page];
  }

  const paths: { params: { id: string[] } }[] = allPages.map((page) => {
    const id = ["news", page.attributes.slug];
    if (page.attributes.locale !== defaultLocale?.code)
      id.unshift(page.attributes.locale);

    return { params: { id } };
  });

  return paths;
};

export const getPage = async (
  locale: string,
  slug: string,
  populate: string | object
) => {
  const query = qs.stringify(
    {
      locale,
      filters: {
        url: { $eq: slug },
      },
      populate,
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );
  const { data } = await (
    await fetch(`${STRAPI_BASE_URL}pages?${query}`)
  ).json();
  if (!data) return null;
  return data[0];
};

export const getGlobalData = async (locale: string) => {
  const query = qs.stringify(
    {
      locale,
      populate: {
        globalMenu: {
          populate: {
            links: {
              populate: {
                global_category: {
                  populate: { homepage: { populate: "url" } },
                },
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data } = await (
    await fetch(`${STRAPI_BASE_URL}global?${query}`)
  ).json();

  return data;
};

export const slugToPath = (slug?: string[] | string) => {
  if (!slug) return "/";
  if (typeof slug !== "string") return "/" + slug.join("/");
  return slug;
};

export const getPageData = async (locale: string, slug?: string[] | string) => {
  // const locales = await getLocales();

  let pageData: IPage | null = null;
  let globalData = null;

  const populate = {
    seo: "*",
    global_category: {
      populate: {
        mainMenu: {
          populate: {
            logo: { populate: "*" },
            links: {
              populate: {
                page: {
                  populate: "url",
                },
                subLinks: {
                  populate: {
                    page: {
                      populate: "url",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    localizations: {
      populate: "*",
    },
    blocks: {
      populate: "*",
    },
  };

  // for (let i = 0; i < locales.length; i++) {
  //   const matched = await getPage(locales[i].code, slugToPath(slug), populate);
  //   if (matched) pageData = matched;
  // }

  // await getPage();

  // const locale = pageData?.attributes.locale;

  pageData = await getPage(locale, slugToPath(slug), populate);

  globalData = await getGlobalData(locale);

  return { pageData, globalData };
};
