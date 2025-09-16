'use client';
import Image from 'next/image';
import { useState } from 'react';
import Emoji from 'react-emoji-render';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<{ success: boolean | null; message: string }>({
    success: null,
    message: '',
  });
  function sendMail() {
    setLoading(true);
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({
        recipients: [{ name: 'Sujeet', address: 'sujeet27yadav@gmail.com' }],
      }),
    })
      .then((res) => res.json())
      .then((r) => setRes(r))
      .catch((e) => setRes(e))
      .finally(() => setLoading(false));
  }

  return (
    <div className='font-sans flex items-center justify-center min-h-screen p-20'>
      <main className='flex flex-col gap-6 items-center'>
        <div className='flex items-center justify-center gap-8'>
          <Image
            className='dark:invert'
            src='/next.svg'
            alt='Next.js logo'
            width={180}
            height={38}
            priority
          />
          <span className='text-5xl'>+</span>
          <Image
            className='dark:invert'
            src='/nm.png'
            alt='Next.js logo'
            width={80}
            height={17}
            priority
          />
        </div>
        <button onClick={sendMail} className='p-2 rounded-md bg-blue-800'>
          Send E-mail
        </button>
        <div className='min-w-1 min-h-10 flex items-center justify-center gap-2'>
          {loading ? (
            <span className='w-6 h-6 aspect-square border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
          ) : (
            res.success !== null && (
              <>
                {res.success ? (
                  <Emoji text=':green_circle:' />
                ) : (
                  <Emoji text=':negative_squared_cross_mark:' />
                )}
                <span>{res.message}</span>
                {res.success ? (
                  <Emoji text=':tada:' />
                ) : (
                  <Emoji text=':crossed_swords:' />
                )}
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
}
