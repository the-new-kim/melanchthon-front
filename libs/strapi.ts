import qs from "qs";
import { IGlobalCategory, ILocale, IPage, IPost, TApiNameTypes } from "./types";

export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

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
  const query = qs.stringify(
    {
      locale,
      filters: {
        url: { $eq: slugToPath(slug) },
      },
      populate: {
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
      },
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

export const getPosts = async (locale: string, apiName: TApiNameTypes) => {
  const query = qs.stringify(
    {
      locale,
      populate: {
        global_category: {
          populate: apiName.replace("-", "_"),
        },
      },
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
    await fetch(`${STRAPI_BASE_URL}${apiName}?${query}`)
  ).json();

  return data;
};

export const getPostPaths = async (apiName: TApiNameTypes) => {
  const locales = await getLocales();
  let allPages: IPost[] = [];

  if (!locales) return [];

  for (let i = 0; i < locales.length; i++) {
    const page = await getPosts(locales[i].code, apiName);
    allPages = [...allPages, ...page];
  }

  const paths: { params: { slug: string[] }; locale: string }[] = allPages.map(
    (page) => {
      let slug: string[] = [];

      if (apiName === "events") {
        const root =
          page.attributes.global_category.data?.attributes.events.data
            ?.attributes.url;

        slug = root ? root.split("/").filter((letter) => letter !== "") : slug;
      }
      if (apiName === "exhibitions") {
        const root =
          page.attributes.global_category.data?.attributes.exhibitions.data
            ?.attributes.url;

        slug = root ? root.split("/").filter((letter) => letter !== "") : slug;
      }
      if (apiName === "news-articles") {
        const root =
          page.attributes.global_category.data?.attributes.news_articles.data
            ?.attributes.url;

        slug = root ? root.split("/").filter((letter) => letter !== "") : slug;
      }

      slug.push(page.attributes.slug);

      return {
        params: { slug, type: "post" },
        locale: page.attributes.locale,
      };
    }
  );

  return paths;
};

export const getGlobalCategories = async (locale: string) => {
  const query = qs.stringify(
    {
      locale,
      populate: ["events", "news_articles", "exhibitions"],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data } = await (
    await fetch(`${STRAPI_BASE_URL}global-categories?${query}`)
  ).json();

  return data;
};

export const getApiName = async (locale: string, slug?: string | string[]) => {
  let apiName: TApiNameTypes = "pages";
  const currentPath = slugToPath(slug);
  const globalCategories: IGlobalCategory[] = await getGlobalCategories(locale);

  globalCategories.forEach((category) => {
    const eventRoot = category.attributes.events.data?.attributes.url + "/";
    const exhibitionRoot =
      category.attributes.exhibitions.data?.attributes.url + "/";
    const newsRoot =
      category.attributes.news_articles.data?.attributes.url + "/";

    if (currentPath.includes(eventRoot)) apiName = "events";
    if (currentPath.includes(exhibitionRoot)) apiName = "exhibitions";
    if (currentPath.includes(newsRoot)) apiName = "news-articles";
  });

  return apiName;
};

export const getPostData = async (
  locale: string,
  apiName: TApiNameTypes,
  slug: string
) => {
  const query = qs.stringify(
    {
      locale,
      filters: {
        slug: { $eq: slug },
      },
      populate: {
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
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data } = await (
    await fetch(`${STRAPI_BASE_URL}${apiName}?${query}`)
  ).json();

  if (!data) return null;

  return data[0];
};

export const getPostsByCategoryId = async (
  postType: TApiNameTypes,
  id: number
) => {
  const json = await (
    await fetch(
      `${STRAPI_BASE_URL}${postType}?filters[global_category][id]=${id}&populate=*`
    )
  ).json();

  return json.data;
};
