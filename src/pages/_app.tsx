import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import Header from '../components/Header';
import { linkResolver } from '../services/prismic';

import '../styles/globals.scss'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
      <PrismicProvider
          linkResolver={linkResolver}
          internalLinkComponent={({ href, ...props }) => (
            <Link href={href}>
              <a {...props} />
            </Link>
          )}
      >
          <Header />
          <Component {...pageProps} />
      </PrismicProvider>
  )
}
