/**
 * Static, crawler-readable markup for each public route. The browser replaces
 * it when the single-page application starts, so this is intentionally a
 * simple semantic rendering of the same data rather than a second UI.
 */
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ContentProvenance from '../components/content/ContentProvenance';
import NationalScopeNotice from '../components/content/NationalScopeNotice';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';
import { siteConfig } from '../config/site';
import { contentGovernanceConfig } from '../config/contentGovernance';
import { publicHotlines } from '../lib/hotlines';
import { serviceCategories, governmentCategories } from '../data/yamlLoader';
import common from '../../public/locales/en/common.json';
import type { HotlineRecord } from '../lib/hotlines';
import type { PublicRoute } from './publicRoutes';

type MarkdownComponent = React.ComponentType<Record<string, unknown>>;

// react-markdown passes its AST `node` to every component, which the shared
// components would spread onto DOM elements; drop it for static output.
function withoutNode(Component: MarkdownComponent): MarkdownComponent {
  return function StaticComponent(props) {
    const rest = { ...props };
    delete rest.node;
    return createElement(Component, rest);
  };
}

const sharedComponents = createMarkdownComponents(
  getTypographyTheme('default')
) as unknown as Record<string, MarkdownComponent>;

const markdownComponents = {
  ...Object.fromEntries(
    Object.entries(sharedComponents).map(([tag, Component]) => [
      tag,
      withoutNode(Component),
    ])
  ),
  // TableWithToggle reads window.matchMedia, so static output uses a plain table.
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">{children}</table>
    </div>
  ),
};

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Municipal government', href: '/government' },
  { label: 'Emergency hotlines', href: '/hotlines' },
  { label: 'About & verification', href: '/about' },
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <nav
          aria-label="Primary"
          className="container mx-auto flex flex-wrap gap-4 px-4 py-4"
        >
          <a href="/" className="font-bold text-primary-700">
            {siteConfig.name}
          </a>
          {navigation.slice(1).map(item => (
            <a key={item.href} href={item.href} className="text-gray-700">
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="container mx-auto flex-grow px-4 py-10">{children}</main>
      <footer className="bg-gray-900 px-4 py-8 text-sm text-gray-300">
        <div className="container mx-auto">
          <p>{common.footer.status}</p>
          <p className="mt-2 text-xs text-gray-400">
            Sources are shown where available. External links do not imply
            endorsement.
          </p>
        </div>
      </footer>
    </div>
  );
}

function RightOfReply({ path }: { path: string }) {
  return (
    <p className="mt-6 border-t border-gray-200 pt-5">
      <a
        href={`/report-incorrect-information?page=${encodeURIComponent(path)}`}
        className="font-medium text-primary-700 underline"
      >
        Report incorrect information
      </a>
    </p>
  );
}

function PageList({ pages }: { pages: NonNullable<PublicRoute['pages']> }) {
  return (
    <ul className="mt-6 space-y-3">
      {pages.map(page => (
        <li key={page.href}>
          <a
            href={page.href}
            className="font-medium text-primary-700 underline"
          >
            {page.name}
          </a>
          {page.description && (
            <p className="text-sm text-gray-600">{page.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

function Hotline({ hotline }: { hotline: HotlineRecord }) {
  return (
    <article id={hotline.id} className="rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold">{hotline.name}</h2>
      <p className="mt-3 text-lg font-bold">
        <a href={`tel:${hotline.phone}`}>{hotline.displayPhone}</a>
      </p>
      <ContentProvenance provenance={hotline.provenance} />
    </article>
  );
}

function Body({ route }: { route: PublicRoute }) {
  switch (route.kind) {
    case 'home':
      return (
        <>
          <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
          <p className="mt-3 max-w-3xl text-gray-700">{common.hero.subtitle}</p>
          <h2 className="mt-10 text-2xl font-semibold">Services</h2>
          <p className="mt-2 text-gray-700">{common.services.description}</p>
          <PageList
            pages={serviceCategories.categories.map(category => ({
              name: category.category,
              description: category.description,
              href: `/services/${category.slug}`,
            }))}
          />
          <h2 className="mt-10 text-2xl font-semibold">Municipal government</h2>
          <p className="mt-2 text-gray-700">
            {common.governmentActivity.description}
          </p>
          <PageList
            pages={governmentCategories.categories.map(category => ({
              name: category.category,
              description: category.description,
              href: `/government/${category.slug}`,
            }))}
          />
          <h2 className="mt-10 text-2xl font-semibold">Emergency hotlines</h2>
          <p className="mt-2 text-gray-700">
            <a href="/hotlines" className="text-primary-700 underline">
              Verified emergency hotlines
            </a>{' '}
            with their official sources.
          </p>
        </>
      );
    case 'hotlines':
      return (
        <>
          <h1 className="text-3xl font-bold">{route.title}</h1>
          <p className="mt-3 max-w-3xl text-gray-700">
            Better Gattaran is an independent civic project; these contacts come
            from the official sources shown with each record.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {publicHotlines.map(hotline => (
              <Hotline key={hotline.id} hotline={hotline} />
            ))}
          </div>
        </>
      );
    case 'about':
      return (
        <>
          <h1 className="text-3xl font-bold">About {siteConfig.name}</h1>
          <p className="mt-3 max-w-3xl text-gray-700">{route.description}</p>
          <p className="mt-3 max-w-3xl text-gray-700">{common.hero.subtitle}</p>
        </>
      );
    case 'services':
    case 'government': {
      const categories =
        route.kind === 'services'
          ? serviceCategories.categories
          : governmentCategories.categories;
      return (
        <>
          <h1 className="text-3xl font-bold">{route.title}</h1>
          <p className="mt-3 max-w-3xl text-gray-700">{route.description}</p>
          <PageList
            pages={categories.map(category => ({
              name: category.category,
              description: category.description,
              href: `/${route.kind}/${category.slug}`,
            }))}
          />
        </>
      );
    }
    case 'category':
      return (
        <>
          <h1 className="text-3xl font-bold">{route.title}</h1>
          <p className="mt-3 max-w-3xl text-gray-700">{route.description}</p>
          <PageList pages={route.pages ?? []} />
        </>
      );
    case 'document': {
      const document = route.document!;
      return (
        <article className="markdown-content">
          {document.scope === 'national_applicable' && <NationalScopeNotice />}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {document.content}
          </ReactMarkdown>
          <ContentProvenance provenance={document.provenance} />
          {contentGovernanceConfig.correctionReportsEnabled && (
            <RightOfReply path={route.path} />
          )}
        </article>
      );
    }
  }
}

export function renderRouteBody(route: PublicRoute): string {
  return renderToStaticMarkup(
    <Shell>
      <Body route={route} />
    </Shell>
  );
}
