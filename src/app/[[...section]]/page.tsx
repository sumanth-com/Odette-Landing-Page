import { JsonLd } from "@/components/JsonLd";
import { LandingPage } from "@/components/LandingPage";
import { buildSectionMetadata } from "@/lib/seo";
import { isValidSectionPath, SITE_SECTIONS, type SectionPath } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

function pathFromSegments(section?: string[]) {
  if (!section?.length) return "/";
  return `/${section.join("/")}`;
}

export function generateStaticParams() {
  return [
    { section: [] as string[] },
    ...SITE_SECTIONS.filter((item) => item.path !== "/").map((item) => ({
      section: item.path.slice(1).split("/"),
    })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}): Promise<Metadata> {
  const { section } = await params;
  const path = pathFromSegments(section);

  if (!isValidSectionPath(path)) {
    return buildSectionMetadata("/");
  }

  return buildSectionMetadata(path);
}

export default async function Page({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;
  const path = pathFromSegments(section);

  if (!isValidSectionPath(path)) {
    notFound();
  }

  return (
    <>
      <JsonLd path={path as SectionPath} />
      <LandingPage />
    </>
  );
}
