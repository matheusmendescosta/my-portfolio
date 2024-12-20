import { useTranslations } from "next-intl";

export const BlogPage = () => {
  const t = useTranslations("components.pages.blog");
  
  return <h1>{t("title")}</h1>;
};
