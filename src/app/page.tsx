import Image from 'next/image';
import Link from 'next/link';
import PassIcon from '@mui/icons-material/Password';

export default function Home() {
  return (
    <main className='font-sans flex flex-col items-center gap-6 px-6 py-20 sm:p-20'>
      <h1 className='text-4xl flex flex-col items-center font-bold text-center'>
        <span>Welcome to</span>
        <span>The Bharat Digi !</span>
      </h1>
      <div className='w-full max-w-xl flex flex-col gap-3 items-center'>
        <h2 className='w-full text-2xl font-semibold'>Tutorials with Demo :</h2>
        <ul className='w-full max-w-xl list-none pl-2 xs:pl-4 space-y-1 *:w-full *:h-14 *:p-2 *:rounded-md *:border *:border-zinc-600 *:hover:bg-zinc-600 *:transition-all *:duration-200 *:flex *:items-center *:justify-center *:text-xl *:2xs:text-2xl *:xs:text-3xl *:sm:text-4xl *:*:w-full *:*:h-full *:*:flex *:*:items-center *:*:justify-center *:*:gap-5'>
          <li>
            <Link href='/passgen'><PassIcon fontSize="inherit"/><span>Password Generator</span></Link>
          </li>
          <li>
            <Link href='/nodemailer'>
              <Image
                className='dark:invert h-[60%] w-auto'
                src='/next.svg'
                alt='Next.js logo'
                width={180}
                height={38}
                priority
              />
              <p>+</p>
              <Image
                className='dark:invert h-full w-auto'
                src='/nm.png'
                alt='Next.js logo'
                width={80}
                height={17}
                priority
              />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
