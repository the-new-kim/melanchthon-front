import qs from "qs";
import { ILocale, IPage } from "./types";

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
        pageSize: 100,
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
  let localPages: IPage[] = [];

  if (!locales) return [];

  for (let i = 0; i < locales.length; i++) {
    const page = await getPages(locales[i].code);
    localPages = [...localPages, ...page];
  }

  const paths: { params: { slug: string[] } }[] = localPages.map((page) => {
    const slug = page.attributes.url
      .split("/")
      .filter((letter) => letter !== "");
    return { params: { slug } };
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

export const getPageData = async (slug?: string[] | string) => {
  const locales = await getLocales();

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

  for (let i = 0; i < locales.length; i++) {
    const matched = await getPage(locales[i].code, slugToPath(slug), populate);
    if (matched) pageData = matched;
  }

  const locale = pageData?.attributes.locale;

  if (locale) {
    globalData = await getGlobalData(locale);
  }

  return { pageData, globalData };
};
