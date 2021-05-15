import Head from 'next/head';

export default function PageHead({ title = 'BxJS - javascript community' }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="BxJS - Building things with javascript"
      />
      <meta
        name="keywords"
        content="bxjs, javascript, community, podcast, bxjs-weekly, react"
      />
    </Head>
  );
}
