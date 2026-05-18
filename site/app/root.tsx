import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
} from "react-router";

import { GA4_MEASUREMENT_ID } from "~/lib/analytics";
import { ORIGIN, personJsonLd } from "~/lib/seo";
import { profile } from "~/generated/content";

import "./styles/app.css";

// Note: per-route meta exports REPLACE root meta in RR7. Tags that should
// appear on every page live in <head> JSX below instead.
export const meta = () => [
  { title: `${profile.bio.name} — ${profile.bio.headline}` },
  { name: "description", content: profile.bio.tagline },
];

export const loader = () => ({
  ga4: GA4_MEASUREMENT_ID,
});

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const ga4 = data?.ga4 ?? null;
  const location = useLocation();
  const pageUrl = `${ORIGIN}${location.pathname === "/" ? "/" : location.pathname}`;
  const ogImage = `${ORIGIN}/og-image.svg`;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={pageUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${profile.bio.name} — ${profile.bio.headline}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
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
