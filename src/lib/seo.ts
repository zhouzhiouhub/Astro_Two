import type { Locale } from "./i18n";

const SITE_NAME = "zhouzhiou";
const DEFAULT_IMAGE = "/og/default.svg";

const siteNameRegex = new RegExp(`\\b${SITE_NAME}\\b`, "i");

export interface SeoInput {
  title: string;
  desc: string;
  url?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  locale?: Locale;
  alternates?: Array<{ lang: Locale; url: string }>;
  appendSiteName?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  og: {
    type: "website" | "article";
    url: string;
    image: string;
    locale?: Locale;
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    image: string;
  };
  alternates: Array<{ lang: Locale; url: string }>;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const seo = (input: SeoInput): SeoMeta => {
  const {
    title,
    desc,
    url = "",
    canonical = url,
    image = DEFAULT_IMAGE,
    type = "website",
    locale,
    alternates = [],
    appendSiteName,
    structuredData,
  } = input;

  const shouldAppend = appendSiteName ?? !siteNameRegex.test(title);
  const finalTitle = shouldAppend ? `${title} · ${SITE_NAME}` : title;

  return {
    title: finalTitle,
    description: desc,
    canonical,
    og: { type, url, image, locale },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: desc,
      image,
    },
    alternates,
    structuredData,
  };
};

