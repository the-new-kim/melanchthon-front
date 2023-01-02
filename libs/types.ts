export interface ILocale {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

export interface IBlock {
  id: number;
  __component: string;
  [key: string]: any;
}

export interface IImage {
  id: number;
  attributes: {
    url: string;
    alternativeText: string;
    caption: string;
    name: string;
    size: number;
    height: number;
    width: number;
    placeholder: string;
    formats: {
      large: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      small: { url: string; width: number; height: number };
      thumbnail: { url: string; width: number; height: number };
    };
  };
}

export interface IMetaSocial {
  description: string;
  image: IImage;
  socialNetwork: string;
  title: string;
}

export interface ISEO {
  id: number;
  canonicalURL: string;
  keywords: string;
  metaDescription: string;
  metaImage: { data: IImage };
  metaRobots: string;
  metaSocial: IMetaSocial[];
  metaTitle: string;
  metaViewport: string;
  structuredData: string;
}

export interface ILocalization {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    url: string;
  };
}

export interface IGlobalCategory {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    mainMenu: IMainMenu;
    homepage: { data: IPage };
    events: { data: IPage };
    exhibitions: { data: IPage };
    news_articles: { data: IPage };
  };
}
export interface IPage {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    url: string;
    blocks: IBlock[];
    seo: ISEO;
    localizations: {
      data: ILocalization[];
    };
    // main_menu: { data: IMainMenu };
    global_category: { data: IGlobalCategory };
  };
}

export interface IInternalLink {
  id: number;
  label: string;
  page: {
    data: IPage;
  };
}

export interface ILink {
  id: number;
  label: string;
  externalUrl: string;
  openInNewTab: boolean;
  page: {
    data: IPage;
  };
}

export interface ILinkWrapper extends ILink {
  subLinks: ILink[];
}

export interface IMainMenu {
  id: number;
  logo: { data: IImage };
  links: ILinkWrapper[];
}

export interface IGlobalMenu {
  id: number;
  links: {
    id: number;
    global_category: {
      data: IGlobalCategory;
    };
  }[];
}

export interface IGlobal {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    globalMenu: IGlobalMenu;
  };
  localizations: {
    data: ILocalization[];
  };
}

export interface IPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    description: string;
    global_category: { data: IGlobalCategory };
  };
}

export interface INewsArticle extends IPost {}

export type TPostApiNameTypes = "news-articles" | "exhibitions" | "events";
export type TApiNameTypes =
  | "pages"
  | "news-articles"
  | "exhibitions"
  | "events";
