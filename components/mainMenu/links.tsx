import { ILink, ILinkWrapper } from "@libs/types";
import { Dispatch, SetStateAction } from "react";

import ExternalLink from "./externalLink";
import InternalLink from "./internalLink";
import LinkWrapper from "./linkWrapper";

// const getLinkComponent = (link: ILinkWrapper) => {
//   const wrapper = link.subLinks.length;
//   const internalLink = link.page.data;
//   const externalLink = link.externalUrl;

//   if (wrapper)
//     return (
//       <LinkWrapper key={link.id} label={link.label} subLinks={link.subLinks} />
//     );
//   if (internalLink)
//     return (
//       <InternalLink
//         key={link.id}
//         label={link.label}
//         openInNewTab={link.openInNewTab}
//         url={link.page.data.attributes.url}
//       />
//     );
//   if (externalLink)
//     return (
//       <ExternalLink
//         key={link.id}
//         url={link.externalUrl}
//         label={link.label}
//         openInNewTab={link.openInNewTab}
//       />
//     );
//   return null;
// };

interface ILinksProps {
  links?: ILinkWrapper[];
  subLinks?: ILink[];
}

export default function Links({ links, subLinks }: ILinksProps) {
  // return <ul>{links.map(getLinkComponent)}</ul>;
  if (links)
    return (
      <ul>
        {links.map((link) => {
          const wrapper = link.subLinks.length;
          const internalLink = link.page.data;
          const externalLink = link.externalUrl;

          if (wrapper)
            return (
              <LinkWrapper
                key={link.id}
                label={link.label}
                subLinks={link.subLinks}
              />
            );
          if (internalLink)
            return (
              <InternalLink
                key={link.id}
                label={link.label}
                openInNewTab={link.openInNewTab}
                url={link.page.data.attributes.url}
              />
            );
          if (externalLink)
            return (
              <ExternalLink
                key={link.id}
                url={link.externalUrl}
                label={link.label}
                openInNewTab={link.openInNewTab}
              />
            );
          return null;
        })}
      </ul>
    );

  if (subLinks)
    return (
      <ul>
        {subLinks.map((link) => {
          const internalLink = link.page.data;
          const externalLink = link.externalUrl;

          if (internalLink)
            return (
              <InternalLink
                key={link.id}
                label={link.label}
                openInNewTab={link.openInNewTab}
                url={link.page.data.attributes.url}
              />
            );
          if (externalLink)
            return (
              <ExternalLink
                key={link.id}
                url={link.externalUrl}
                label={link.label}
                openInNewTab={link.openInNewTab}
              />
            );
          return null;
        })}
      </ul>
    );

  return null;
}
