import Head from 'next/head';
import Hero from '../components/Hero';

const toss = () => Math.floor(Math.random() * 2);

export default function Home() {
  return (
    <div>
      <Head>
        <title>RAMNEWS</title>
      </Head>
      <Hero
        title="Stories That Count, From People Who Care"
        subtitle="With RAMNEWS you can get all the latest happenings from around the world."
        image={`/images/${toss() === 0 ? 'hero.svg' : 'hero2.svg'}`}
        ctaText="Create your account now"
        ctaLink="/"
      />
    </div>
  );
}
