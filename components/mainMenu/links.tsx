import { ILink, ILinkWrapper } from "@libs/types";

import ExternalLink from "./externalLink";
import InternalLink from "./internalLink";
import LinkWrapper from "./linkWrapper";
import Slider from "./slider";

interface ILinksProps {
  links?: ILinkWrapper[];
  subLinks?: ILink[];
  pageId: number;
}

export default function Links({ links, subLinks, pageId }: ILinksProps) {
  if (links)
    return (
      <ul>
        {links.map((link, index) => {
          const linkId = `${pageId}${link.label}`;
          const wrapper = link.subLinks.length;
          const internalLink = link.page.data;
          const externalLink = link.externalUrl;

          if (wrapper)
            return (
              <Slider index={index} key={linkId} linkId={linkId}>
                <LinkWrapper
                  key={linkId}
                  label={link.label}
                  subLinks={link.subLinks}
                />
              </Slider>
            );
          if (internalLink)
            return (
              <Slider index={index} key={linkId} linkId={linkId}>
                <InternalLink
                  label={link.label}
                  openInNewTab={link.openInNewTab}
                  url={link.page.data.attributes.url}
                />
              </Slider>
            );
          if (externalLink)
            return (
              <Slider index={index} key={linkId} linkId={linkId}>
                <ExternalLink
                  key={linkId}
                  url={link.externalUrl}
                  label={link.label}
                  openInNewTab={link.openInNewTab}
                />
              </Slider>
            );
          return null;
        })}
      </ul>
    );

  if (subLinks)
    return (
      <ul>
        {subLinks.map((link, index) => {
          const linkId = `${pageId}${link.label}`;
          const internalLink = link.page.data;
          const externalLink = link.externalUrl;

          if (internalLink)
            return (
              <Slider index={index} key={linkId} linkId={linkId}>
                <InternalLink
                  key={linkId}
                  label={link.label}
                  openInNewTab={link.openInNewTab}
                  url={link.page.data.attributes.url}
                />
              </Slider>
            );
          if (externalLink)
            return (
              <Slider index={index} key={linkId} linkId={linkId}>
                <ExternalLink
                  key={linkId}
                  url={link.externalUrl}
                  label={link.label}
                  openInNewTab={link.openInNewTab}
                />
              </Slider>
            );
          return null;
        })}
      </ul>
    );

  return null;
}
