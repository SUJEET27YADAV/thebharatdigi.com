import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tutorials | The Bharat Digital",
  description:
    "Explore interactive tutorials including a password generator, nodemailer demo, and more web development tools from The Bharat Digital.",
};

export default function Home() {
  return (
    <main className="w-full max-w-7xl mx-auto overflow-x-hidden font-sans flex flex-col items-center gap-6 px-6 py-20 sm:p-20">
      <h1 className="sr-only">
        The Bharat Digital: &quot;Premium Web Development Company that offers SEO
        Audit Tools, e-commerce solutions, IT support & much more for Businesses
        all over the world.
      </h1>
      <h2 className="text-4xl flex flex-col items-center font-bold text-center">
        <span>Web Development</span>
        <span>Tutorials &amp; Tools</span>
      </h2>
      <p className="text-slate-600 dark:text-gray-400 text-center max-w-xl">
        Hands-on tutorials and interactive demos to help you explore useful web
        development tools. Try our password generator for secure credentials, or
        test the nodemailer integration for sending transactional emails
        directly from your application.
      </p>
      <div className="w-full max-w-xl flex flex-col gap-3 items-center">
        <h2 className="w-full text-2xl font-semibold">Tutorials with Demo :</h2>
        <ul className="w-full max-w-xl list-none pl-2 xs:pl-4 flex flex-col gap-y-1 *:w-full *:h-14 *:p-2 *:rounded *:border *:border-zinc-600 *:hover:bg-zinc-600 *:transition-all *:duration-200 *:flex *:items-center *:justify-center *:text-xl *:2xs:text-2xl *:xs:text-3xl *:sm:text-4xl *:*:w-full *:*:h-full *:*:flex *:*:items-center *:*:justify-center *:*:gap-5">
          <li>
            <Link href="/passgen">
              <KeyRound />
              <span>Password Generator</span>
            </Link>
          </li>
          <li>
            <Link href="/nodemailer">
              <Image
                className="dark:invert h-[60%] w-auto"
                src="/next.svg"
                alt="Next.js"
                width={180}
                height={38}
                priority
              />
              <p>+</p>
              <Image
                className="dark:invert h-full w-auto"
                src="/NodeMailer.png"
                alt="Nodemailer"
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
