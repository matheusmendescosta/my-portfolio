import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Page");

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {t("title")}
      </h1>
                        <p className="mb-4">{t("description")}</p>
    </section>
  );
}
