import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
} from "react-router";

import { GA4_MEASUREMENT_ID } from "~/lib/analytics";
import { ORIGIN, personJsonLd } from "~/lib/seo";
import { profile } from "~/generated/content";

import "./styles/app.css";

export const meta = () => [
  { title: `${profile.bio.name} — ${profile.bio.headline}` },
  { name: "description", content: profile.bio.tagline },
  { tagName: "link", rel: "canonical", href: `${ORIGIN}/` },
  { property: "og:title", content: `${profile.bio.name} — ${profile.bio.headline}` },
  { property: "og:description", content: profile.bio.tagline },
  { property: "og:type", content: "profile" },
  { property: "og:url", content: `${ORIGIN}/` },
  { property: "og:image", content: `${ORIGIN}/og-image.svg` },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: `${profile.bio.name} — ${profile.bio.headline}` },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:image", content: `${ORIGIN}/og-image.svg` },
];

export const loader = () => ({
  ga4: GA4_MEASUREMENT_ID,
});

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const ga4 = data?.ga4 ?? null;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted server-rendered JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        {ga4 ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} />
            <script
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted GA4 bootstrap
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'analytics_storage': 'denied',
                    'wait_for_update': 500
                  });
                  gtag('js', new Date());
                  gtag('config', '${ga4}', { 'anonymize_ip': true });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const isRouteError = isRouteErrorResponse(error);
  const title = isRouteError ? `${error.status} ${error.statusText}` : "Something went wrong";
  return (
    <main className="mx-auto max-w-2xl px-6 py-32">
      <h1 className="text-3xl font-medium tracking-tight">{title}</h1>
      <p className="mt-4 text-zinc-500">
        <a href="/" className="underline underline-offset-4">
          Back to home
        </a>
      </p>
    </main>
  );
}
