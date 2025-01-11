import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone" as "standalone" | "export" | undefined,
};

export default withNextIntl(nextConfig);
