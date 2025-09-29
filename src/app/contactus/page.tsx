'use client';
// import LocationSection from '@/app/_components/home/locationsection';
// import OpenSlot from '@/app/_components/openSlot';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ContactUs() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8 sm:pb-26 space-y-6 font-extrabold text-sm 2xs:text-xl sm:text-2xl">
      {/* <OpenSlot /> */}
      <h1 className="w-full text-3xl text-center font-bold">Contact Us</h1>
      {/* <LocationSection /> */}
      <a
        href="mailto:bhawaniduttofficial@gmail.com"
        className="flex items-center justify-center gap-2"
      >
        <EmailIcon
          fontSize="inherit"
          className="text-blue-900 dark:text-zinc-300"
        />
        <span>support@thebharatdigi.com</span>
      </a>
      <a
        href="tel:9999239307"
        className="flex items-center justify-center gap-2"
      >
        <PhoneIcon
          fontSize="inherit"
          className="text-blue-900 dark:text-zinc-300"
        />
        <span>+91 - 9999239307</span>
      </a>
    </main>
  );
}
