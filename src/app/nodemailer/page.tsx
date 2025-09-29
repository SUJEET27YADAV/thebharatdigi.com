'use client';
import Image from 'next/image';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { useState } from 'react';
import Emoji from 'react-emoji-render';

interface ApiResponse {
  success: boolean | null;
  msg: string;
  error: unknown;
  info: SMTPTransport.SentMessageInfo | null;
}
interface Recipients {
  name: string;
  address: string;
}

interface EmailType {
  subject: string | null;
  text: string | null;
  html: string | null;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [recipients, setRecipients] = useState<Recipients[]>([]);
  const [email, setEmail] = useState<EmailType>({
    subject: null,
    text: null,
    html: null,
  });
  const [res, setRes] = useState<ApiResponse>({
    success: null,
    msg: '',
    error: '',
    info: null,
  });

  function parseRecipients(formData: FormData) {
    const name = formData.get('rname') as string;
    const address = formData.get('raddress') as string;
    if (!name || !address) {
      setErr('Both Name and address are required !');
    } else {
      setErr('');
      setRecipients((p) => {
        return [...p, { name, address }];
      });
    }
  }
  function sendMail(e: React.FormEvent) {
    e.preventDefault();
    if (recipients.length === 0)
      return setErr('Please add a recipient to send Email !');
    if (!email.text || !email.html)
      return setErr('Add Some text to Email body to send Email !');
    if (!email.subject) return setErr('Add a Subject to describe your Email !');
    setLoading(true);
    fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify({ recipients, email }),
    })
      .then((res) => res.json())
      .then((r) => setRes(r))
      .catch((e) => setRes(e))
      .finally(() => {
        setLoading(false);
        (e.target as HTMLFormElement).reset;
      });
  }

  return (
    <main className="w-full flex flex-col items-center justify-center p-10 gap-4 font-sans">
      <div className="w-full flex items-center justify-center gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <span className="text-5xl">+</span>
        <Image
          className="dark:invert"
          src="/nm.png"
          alt="Next.js logo"
          width={80}
          height={17}
          priority
        />
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <section className="max-sm:w-10 sm:w-full h-full bg-blue-500"></section>
        <section className="w-full flex flex-col gap-2 items-center overflow-hidden">
          <p className="w-full min-h-6 font-bold text-center text-red-500">
            {err}
          </p>
          <form
            action={parseRecipients}
            className="w-full flex flex-col items-center gap-2"
          >
            <div className="w-full flex items-center gap-4">
              <label className="w-1/2 flex flex-col gap-1">
                <span className="font-bold">Recipient name : </span>
                <input
                  name="rname"
                  type="text"
                  className="w-full border border-zinc-600 rounded-md p-1 outline-none"
                />
              </label>
              <label className="w-1/2 flex flex-col gap-1">
                <span className="font-bold">Recipient email : </span>
                <input
                  name="raddress"
                  type="text"
                  className="w-full border border-zinc-600 rounded-md p-1 outline-none"
                />
              </label>
            </div>
            <button type="submit" className="p-2 rounded-md bg-blue-800">
              Add Recipient
            </button>
          </form>
          <div className="w-full min-h-12 flex flex-wrap gap-2 p-1 text-red-500 *:text-xs rounded-md border border-zinc-600">
            <h2 className={`font-bold text-green-500`}>Recipients :</h2>
            {recipients.length === 0 ? (
              <span className="text-red-500">
                ---- No recipients added ----
              </span>
            ) : (
              recipients.map((r, i) => (
                <span key={i} className="text-white">
                  {`<${r.name}:${r.address}>` +
                    (recipients.length === 1 ? '' : ', ')}
                </span>
              ))
            )}
          </div>
          <form
            onSubmit={sendMail}
            className="w-full flex flex-col items-center gap-2"
          >
            <label className="w-full flex flex-col gap-1">
              <span className="font-bold">Email Subject: </span>
              <input
                onChange={(e) => {
                  setEmail((p) => {
                    return { ...p, subject: e.target.value };
                  });
                }}
                type="text"
                className="border border-zinc-600 rounded-md p-1 outline-none"
              />
            </label>
            <label className="w-full flex flex-col gap-1">
              <span className="font-bold">Email body: </span>
              <textarea
                onChange={(e) =>
                  setEmail((p) => {
                    return { ...p, text: e.target.value, html: e.target.value };
                  })
                }
                rows={4}
                placeholder="---- Email Body Here ----"
                className="border border-zinc-600 rounded-md p-2 outline-none placeholder:text-xl placeholder:text-center"
              />
            </label>
            <button type="submit" className="p-2 rounded-md bg-blue-800">
              Send E-mail
            </button>
          </form>
          <div className="min-w-1 min-h-10 flex items-center justify-center gap-2">
            {loading ? (
              <span className="w-6 h-6 aspect-square border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              res.success !== null && (
                <>
                  {res.success ? (
                    <Emoji text=":green_circle:" />
                  ) : (
                    <Emoji text=":negative_squared_cross_mark:" />
                  )}
                  <span>{res.msg}</span>
                  {res.success ? (
                    <Emoji text=":tada:" />
                  ) : (
                    <Emoji text=":crossed_swords:" />
                  )}
                </>
              )
            )}
          </div>
        </section>
        <section className="max-sm:w-10 sm:w-full h-full bg-blue-500"></section>
      </div>
    </main>
  );
}
