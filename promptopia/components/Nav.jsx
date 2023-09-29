"use client"; /* useeffect only uses client side */

import Link from "next/link"; /* This allows us to move to the other pages of our application */
import Image from "next/image"; /* Automatically optimizes image */
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"; /* Makes user sign in and sign out flow incredibly simple */

/* The contents in Nav Bar will appear on top */
const Nav = () => {

  /*
    - useEffect without array dependecies or without empty array will be triggered every time a change has been made to any set/useState
        **even when you type a letter in input field
    - useEffect with empty array will only run once after all the rendering has been done
    - useEffect with array dependencies will always be triggered for any changes in each element of the array dependencies
  */

  // useEffect(() => {
  //   (async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   })();
  // }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        {/* Returns logo of application */}
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>{/* On small devices it's visible, but on bigger devices it's hidden */}
        {/* Needs to know if the user is logged in or not so we need to find out which buttons to show  */}
        {session?.user ? ( /* If the user is logged in, user can create post, signout button and user's profile info will be shown */
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav