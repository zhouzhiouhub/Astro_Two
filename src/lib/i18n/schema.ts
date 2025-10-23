export type Dict = Record<string, string>;

export type Namespaced = Record<
  | "common"
  | "home"
  | "pricing"
  | "integrations"
  | "contact"
  | "product"
  | "videos"
  | "faq"
  | "about"
  | "download"
  | "blog"
  | "projects"
  | "notes"
  | "testimonials",
  Dict
>;
