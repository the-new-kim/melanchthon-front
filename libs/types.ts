export type TLocaleTypes = "de" | "en";

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

export interface IAudio {
  id: number;
  attributes: {
    alternativeText: string;
    caption: string;
    createdAt: string;
    ext: string;
    formats: string;
    hash: string;
    // height: null;
    mime: string; //"audio/mpeg";
    name: string; //"D-2_1.mp3";
    placeholder: string; //null;
    previewUrl: string; //null;
    provider: string; //"aws-s3";
    provider_metadata: string; //null;
    size: number; // 2578.68;
    updatedAt: string; //"2023-03-02T00:05:21.872Z";
    url: string; // "https://melanchthon.s3.eu-central-1.amazonaws.com/D_2_1_74d9e93ab8.mp3";
    // width: null;
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
    locale: TLocaleTypes;
    slug: string;
  };
}

export interface IGlobalCategory {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: TLocaleTypes;
    mainMenu: IMainMenu;
    footerMenu: IFooterMenu;
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
    locale: TLocaleTypes;
    slug: string;
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
  href: string;
  target: string;
}

export interface ILinkWrapper extends ILink {
  subLinks: ILink[];
}

export interface IMainMenu {
  id: number;
  logo: { data: IImage };
  links: ILinkWrapper[];
}

export interface IFooterMenu {
  id: number;
  links: ILink[];
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
    locale: TLocaleTypes;
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
    locale: TLocaleTypes;
    description: string;
    global_category: { data: IGlobalCategory };
  };
}

export interface INewsArticle extends IPost {
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: TLocaleTypes;
    description: string;
    global_category: { data: IGlobalCategory };
    mainImage: { data: IImage };
  };
}

export interface IEvent extends IPost {
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: TLocaleTypes;
    description: string;
    global_category: { data: IGlobalCategory };
    mainImage: { data: IImage };
    eventDate: string;
    location: string;
  };
}

export interface IExhibition extends IPost {
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: TLocaleTypes;
    description: string;
    global_category: { data: IGlobalCategory };
    mainImage: { data: IImage };
    dateFrom: string;
    dateTo: string;
    location: string;
  };
}

export type TApiNameTypes =
  | "pages"
  | "news-articles"
  | "exhibitions"
  | "events";

// export interface ICard {
//   title: string;
//   description: string;
//   image: IImage;
//   href: string;
//   meta?: {
//     [key: string]: string;
//   }[];
//   reversed?: boolean;
//   responsible?: boolean;
// }

export interface IButton {
  label: string;
  link: string;
}

export interface IPerson {
  id: number;
  attributes: {
    email: string;
    image: { data: IImage };
    name: string;
    position: string;
    tel: string;
  };
}

export interface IAudioGuideItem {
  id: number;
  title: string;
  audio: { data: IAudio };
  thumbnail: { data: IImage };
}
