import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='font-sans flex flex-col items-center min-h-screen gap-6 p-20'>
      <h1 className='text-4xl font-bold'>Welcome to The Bharat Digi !</h1>
      <main className='w-full flex flex-col gap-6 items-center'>
        <h2 className='w-full text-2xl font-semibold'>Tutorials with Demo :</h2>
        <ul className='w-full list-none'>
          <li>
            <Link
              href='/nodemailer'
              className='flex items-center justify-center gap-8 p-2 rounded-md border border-zinc-600 hover:bg-zinc-600 transition-all duration-200'
            >
              <Image
                className='dark:invert h-10 w-auto'
                src='/next.svg'
                alt='Next.js logo'
                width={180}
                height={38}
                priority
              />
              <span className='text-5xl'>+</span>
              <Image
                className='dark:invert h-10 w-auto'
                src='/nm.png'
                alt='Next.js logo'
                width={80}
                height={17}
                priority
              />
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
