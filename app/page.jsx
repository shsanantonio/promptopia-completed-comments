/*
 * Represents the homepage route of the application
 * localhost:3000/
 * Adding "use client" will turn this into a client side component instead of the default server side: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
 */

import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' /> {/* Hide on Large devices but break down on smaller devices */}
      <span className='orange_gradient text-center'> AI-Powered Prompts</span>
    </h1>
    <p className='desc text-center'>
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>

    <Feed />
  </section>
);

export default Home;
