import { createFileRoute } from "@tanstack/react-router";
import { Opening } from "@/components/invite/opening";
import { SiteNav } from "@/components/invite/site-nav";
import { Closing, Events, Hero, Invitation, Venue } from "@/components/invite/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anamika & Subhadip · Wedding Invitation · 13 December 2026" },
      {
        name: "description",
        content:
          "Wedding invitation of Anamika & Subhadip — Sunday, 13 December 2026, Kumudini Guest House, Moyna, Purba Medinipur.",
      },
      { property: "og:title", content: "Anamika & Subhadip · Wedding Invitation" },
      {
        property: "og:description",
        content: "You are warmly invited to the wedding celebration of Anamika & Subhadip — Sunday, 13 December 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Opening />
      <SiteNav />
      <main>
        <Hero />
        <Invitation />
        <Events />
        <Venue />
      </main>
      <Closing />
    </>
  );
}
