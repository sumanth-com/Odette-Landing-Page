import { LandingPage } from "@/components/LandingPage";
import { isValidSectionPath, SITE_SECTIONS } from "@/lib/site";
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

  return <LandingPage />;
}
