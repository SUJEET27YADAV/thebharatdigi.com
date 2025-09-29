'use client';
import { useEffect, useRef, useState } from 'react';
// import { useTheme } from 'next-themes';
// import { signOut } from 'next-auth/react';
import Link from 'next/link';
// import ToggleButton from './ui/togglebtn';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
// import Signup from '@mui/icons-material/AppRegistration';
// import Gallery from '@mui/icons-material/PhotoAlbum';
import About from '@mui/icons-material/Description';
import Contact from '@mui/icons-material/ContactPage';
// import ProfileIcon from '@mui/icons-material/Person';
import PolicyIcon from '@mui/icons-material/Policy';
import Logo from './ui/logo';
// import { User } from 'next-auth';
// import Image from 'next/image';

// interface NavProps {
//   user: User | undefined;
// }

interface NavLink {
  icon: React.ReactNode;
  label: string;
  path: string;
}

// export default function Navbar({ user }: NavProps) {
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const { resolvedTheme, setTheme } = useTheme();
  const dref = useRef<HTMLDivElement>(null);
  const dbref = useRef<HTMLButtonElement>(null);

  const links: NavLink[] = [
    {
      icon: <Home fontSize="inherit" />,
      label: 'home',
      path: '/',
    },
    {
      icon: <About fontSize="inherit" />,
      label: 'about',
      path: '/aboutus',
    },
    {
      icon: <Contact fontSize="inherit" />,
      label: 'contact',
      path: '/contactus',
    },
    {
      icon: <PolicyIcon fontSize="inherit" />,
      label: 'Privacy Policy',
      path: '/privacypolicy',
    },
  ];

  useEffect(() => {
    if (drawerOpen) {
      const handleDrawerClose = (event: MouseEvent) => {
        if (dref.current && dbref.current) {
          const db = dbref.current;
          const d = dref.current;
          if (
            !db.contains(event.target as Node) &&
            (!d.contains(event.target as Node) ||
              (event.target as HTMLElement).closest('#list'))
          ) {
            if ((event.target as HTMLElement).closest('#list')) {
              setTimeout(() => {
                setDrawerOpen(false);
              }, 500);
            } else {
              setDrawerOpen(false);
            }
          }
        }
      };

      document.addEventListener('mousedown', handleDrawerClose);
      return () => {
        document.removeEventListener('mousedown', handleDrawerClose);
      };
    }
  }, [drawerOpen]);

  return (
    <nav className="relative w-full top-0 z-50 text-zinc-900">
      <div className="relative h-16 px-2 sm:px-5 flex items-center justify-between bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-800">
        <button
          type="button"
          title="Menu Button"
          ref={dbref}
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="max-sm:flex text-2xl hidden items-center justify-center cursor-pointer"
        >
          <MenuIcon fontSize="inherit" />
        </button>
        <div className="max-sm:absolute max-sm:left-1/2 max-sm:-translate-x-1/2 h-16 flex items-center justify-center overflow-hidden">
          <Logo className="h-full py-1" />
        </div>
        <div
          ref={dref}
          className={`max-sm:absolute max-sm:left-0 max-sm:top-16 max-xs:w-[60%] max-sm:w-1/2 max-sm:min-h-screen max-sm:bg-gray-400/40 max-sm:p-2 max-sm:dark:bg-gray-700/40 max-sm:z-30 max-sm:backdrop-blur-md max-sm:drop-shadow-xl ${
            drawerOpen ? 'max-sm:block' : 'max-sm:hidden'
          }`}
        >
          <ul
            id="list"
            className="flex max-sm:flex-col items-center sm:justify-center gap-1 sm:gap-3 list-none"
          >
            {links.map((l, i) => (
              <li
                key={i}
                className="max-sm:w-full max-sm:bg-white/30 rounded-md"
              >
                <Link
                  href={l.path}
                  className="w-full p-3 flex items-center font-bold justify-between sm:p-0 sm:py-1 max-xs:text-sm max-sm:dark:text-zinc-300"
                >
                  <p className="w-full flex items-center gap-1 capitalize">
                    <span className="sm:hidden">{l.icon}</span>
                    {l.label}
                  </p>
                  <span className="sm:hidden">
                    <ChevronRightIcon fontSize="inherit" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="flex items-center justify-end gap-3">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex flex-col items-center justify-center text-2xl cursor-pointer"
              >
                {user?.image ? (
                  <Image
                    src={user?.image ?? '/logo.png'}
                    alt="profile Pic"
                    width={500}
                    height={500}
                    className="w-6 aspect-square object-contain rounded-full border-1 border-zinc-600 bg-white"
                  />
                ) : (
                  <ProfileIcon fontSize="inherit" />
                )}
                <span className="font-semibold text-[8px]">Profile</span>
              </Link>
              <div
                onClick={() => {
                  signOut({ redirectTo: '/?r=login' });
                }}
                className="flex flex-col items-center justify-center text-2xl cursor-pointer"
              >
                <LogoutIcon fontSize="inherit" />
                <span className="font-semibold text-[8px]">Logout</span>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex flex-col items-center justify-center text-2xl cursor-pointer"
              >
                <LoginIcon fontSize="inherit" />
                <span className="font-semibold text-[8px]">Login</span>
              </Link>
              <Link
                href="/signup"
                className="flex flex-col items-center justify-center text-2xl cursor-pointer"
              >
                <Signup fontSize="inherit" />
                <span className="font-semibold text-[8px]">SignUp</span>
              </Link>
            </>
          )}
        </div> */}
        <div className="w-16 h-16 flex items-center justify-end gap-3"></div>
      </div>
      {/* <div
        className={`w-full flex items-center justify-center gap-2 p-2 ${
          resolvedTheme === 'dark' ? 'bg-blue-400' : 'bg-red-400'
        }`}
      >
        <span className="text-sm font-semibold italic font-sans">
          Bright Mode
        </span>
        <ToggleButton
          enabled={resolvedTheme === 'dark'}
          setEnabled={(val: boolean) => setTheme(val ? 'dark' : 'light')}
        />
        <span className="text-sm font-semibold italic font-sans">
          Dark Mode
        </span>
      </div> */}
    </nav>
  );
}
