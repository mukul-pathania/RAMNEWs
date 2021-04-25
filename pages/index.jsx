import Head from 'next/head';
import { useRouter } from 'next/router';
import Hero from '../components/Hero';
import useAuth from '../contexts/AuthContext';

const toss = () => Math.floor(Math.random() * 2);

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (isAuthenticated) router.push('/headlines');

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
