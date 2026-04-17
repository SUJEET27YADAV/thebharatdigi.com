'use client';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import FooterLink from './ui/footerlink';
import Logo from './ui/logo';

export default function Footer() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center p-4 xs:px-6 sm:px-4 lg:px-10 gap-2 bg-gradient-to-br from-orange-400 from-[15%] via-white/75 to-green-600 to-[85%]">
        <Logo className="w-30 sm:w-36" />
        <div className="w-full flex flex-col sm:flex-row max-sm:pb-2 dark:text-white">
          <div className="w-full sm:w-[33%] flex flex-col sm:items-center py-1 sm:py-3 sm:border-r-3 sm:border-zinc-700/50 dark:sm:border-zinc-300/50">
            <h2 className="font-bold text-xl xs:text-2xl sm:text-3xl pb-1 sm:pb-3">
              Quick Links
            </h2>
            <ul className="w-full text-xs 2xs:text-sm sm:text-base pl-4 md:pl-12 lg:w-[unset] lg:p-0 space-y-1">
              <li className="">
                <FooterLink href="/aboutus">About us</FooterLink>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-[33%] flex flex-col sm:items-center py-1 sm:py-3 sm:border-r-3 sm:border-zinc-700/50 dark:sm:border-zinc-300/50">
            <h2 className="font-bold text-xl xs:text-2xl sm:text-3xl pb-1 sm:pb-3">
              Policies
            </h2>
            <ul className="w-full text-xs 2xs:text-sm sm:text-base pl-4 md:pl-12 lg:w-[unset] lg:p-0 space-y-1">
              <li className="">
                <FooterLink href="/t&c">Terms & Conditions</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacypolicy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/returnpolicy">Return Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/refundpolicy">Refund Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/shippingpolicy">Shipping Policy</FooterLink>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-[34%] flex flex-col sm:items-center py-1 sm:py-3">
            <h2 className="font-bold text-xl xs:text-2xl sm:text-3xl pb-1 sm:pb-3">
              Contact us
            </h2>
            <ul className="w-full text-xs 2xs:text-sm sm:text-base pl-4 md:pl-12 lg:w-[unset] lg:p-0 space-y-1">
              <li>
                <FooterLink href="mailto:support@thebharatdigi.com">
                  <EmailIcon fontSize="inherit" className="text-white" />
                  <span className="flex-1 line-clamp-1 break-words">
                    support@thebharatdigi.com
                  </span>
                </FooterLink>
              </li>
              <li>
                <FooterLink href="tel:9999239307">
                  <PhoneIcon fontSize="inherit" className="text-white" />
                  <span>+91 - 99992 39307</span>
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <p className="text-center text-xl font-bold underline">
            Follow us on :
          </p>
          <div className="max-w-100 mx-auto flex items-center justify-evenly text-5xl">
            <Link href="/" target="blank">
              <FacebookIcon
                fontSize="inherit"
                className="text-blue-700 drop-shadow-xl drop-shadow-black/80"
              />
            </Link>
            <Link href="/" target="blank">
              <YouTubeIcon
                fontSize="inherit"
                className="text-red-600 drop-shadow-xl drop-shadow-black/80"
              />
            </Link>
            <Link
              href="/"
              target="blank"
              className="w-10 aspect-square flex items-center justify-center rounded-xl text-4xl text-white bg-gradient-to-bl from-red-600 via-indigo-600 via-[60%] to-yellow-300 to-[90%] drop-shadow-xl drop-shadow-black/80"
            >
              <InstagramIcon fontSize="inherit" className="" />
            </Link>
          </div>
        </div>
      </div>
      <p className="w-full p-2 text-center text-xs sm:text-base">
        &copy; 2025 The Bharat Digital (Sujeet Yadav). All rights reserved.
      </p>
    </div>
  );
}
