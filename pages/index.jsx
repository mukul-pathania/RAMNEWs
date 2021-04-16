import Head from 'next/head';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Hero
        title="Stories That Count, From People Who Care"
        subtitle="With RAMNEWS you can get all the latest happenings from around the world."
        image="/images/hero.svg"
        ctaText="Create your account now"
        ctaLink="/"
      />
    </div>
  );
}
