"use client"; /* useeffect only uses client side */

import Link from "next/link"; /* This allows us to move to the other pages of our application */
import Image from "next/image"; /* Automatically optimizes image */
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"; /* Makes user sign in and sign out flow incredibly simple */

/* The contents in Nav Bar will appear on top */
const Nav = () => {

  /*
   * This can be three values: Session / undefined / null.
    when the session hasn't been fetched yet, data will be undefined
    in case it failed to retrieve the session, data will be null
    in case of success, data will be Session.
   */
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null); //provider list
  const [toggleDropdown, setToggleDropdown] = useState(false); // for mobile device only, profile bar

  /*
    - useEffect without array dependecies or without empty array will be triggered every time a change has been made to any set/useState
        **even when you type a letter in input field
    - useEffect with empty array will only run once after all the rendering has been done
    - useEffect with array dependencies will always be triggered for any changes in each element of the array dependencies
  */

  useEffect(() => {
    (async () => {
      const res = await getProviders(); //The getProviders() method returns the list of providers currently configured for sign in such as google & next auth
      setProviders(res);
    })(); // used IIFE
  }, []); // This only runs as the start

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
        ) : ( /* Else if the user has not logged in, a button to log in will be displayed  */
          <>
            {providers && //checks if we have access to providers such as google & nexauth, if the prvider list is not empty
              Object.values(providers).map((provider) => ( //object.values convert it to array that allows to access Array.prototype.map() method
                <button // returns button for each provider
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


      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'> {/* On small devices it's gonna be hidden, but on bigger devices it's gonna be visible   */}
        {session?.user ? (/* If the user is logged in, user can create post, signout button and user's profile info will be shown */
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              /* onClick={() => setToggleDropdown(!toggleDropdown)}  <----wrong, it's never a good idea to change react state using the previous version of that same state
              as that can lead to unexpected behavior it's best open up a new callback function within that state where we get the previous state called prev and update it like below */
              onClick={() => setToggleDropdown((prev) => !prev)} //will set it to true
            />
            {toggleDropdown && ( //If profile was clicked where toggleDropdown is true, the dropdown menu will be displayed
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)} //resets setToggleDropdown so the dropdown menu won't be visible
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)} //resets setToggleDropdown so the dropdown menu won't be visible
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false); //resets setToggleDropdown so the dropdown menu won't be visible
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (/* Else if the user has not logged in, a button to log in will be displayed  */
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