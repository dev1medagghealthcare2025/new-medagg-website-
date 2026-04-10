'use client';

import NextLink from 'next/link';
import { useParams as useNextParams, useRouter } from 'next/navigation';

export function Link({ to, href, replace, prefetch, scroll, shallow, ...props }) {
  const finalHref = href || to || '/';
  return (
    <NextLink
      href={finalHref}
      replace={replace}
      prefetch={prefetch}
      scroll={scroll}
      shallow={shallow}
      {...props}
    />
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === 'number') {
      router.back();
      return;
    }
    const href = String(to || '/');
    const replace = options && options.replace;
    if (replace) router.replace(href);
    else router.push(href);
  };
}

export function useParams() {
  return useNextParams();
}

export function useLocation() {
  if (typeof window === 'undefined') {
    return { pathname: '', search: '', hash: '' };
  }
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function Navigate({ to, replace }) {
  const router = useRouter();
  const href = String(to || '/');
  if (replace) router.replace(href);
  else router.push(href);
  return null;
}

export function BrowserRouter({ children }) {
  return children;
}

export function Routes({ children }) {
  return children;
}

export function Route() {
  return null;
}
