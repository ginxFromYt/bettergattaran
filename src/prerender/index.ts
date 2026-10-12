import {
  collectPublicRoutes,
  loadDefaultInput,
  type PublicContentInput,
  type PublicRoute,
} from './publicRoutes';
import { renderRouteBody } from './render';
import { applyTemplate, buildRobots, buildSitemap } from './seo';

export interface PrerenderOutput {
  /** Relative file path inside the build directory, e.g. `services/index.html`. */
  file: string;
  html: string;
}

export function fileForPath(path: string): string {
  return path === '/' ? 'index.html' : `${path.replace(/^\//, '')}/index.html`;
}

export function prerenderRoutes(
  routes: PublicRoute[],
  template: string
): PrerenderOutput[] {
  return routes.map(route => ({
    file: fileForPath(route.path),
    html: applyTemplate(template, route, renderRouteBody(route)),
  }));
}

export async function buildPrerender(
  template: string,
  input?: PublicContentInput
) {
  const routes = collectPublicRoutes(input ?? (await loadDefaultInput()));
  return {
    routes,
    pages: prerenderRoutes(routes, template),
    sitemap: buildSitemap(routes),
    robots: buildRobots(),
  };
}
