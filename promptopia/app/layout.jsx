/**
 * Layout.js is the main entry point of application
 * Contents will be displayed in every router you create
 * Common layout or template for all of the pages
 * All components in this file will be shared in the entire application
 * Customizes the appearance of HTML document
 * You can mofify language, metadata, scrip tags, links and fonts
 */
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
/**
 * Metadata is the abstract of the website's content and is used to attach a title, a description, and an image to the site.
 * HTML version - <meta name="title" content="Promptopia"/>
*/
export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
};

  const RootLayout = ({ children }) => (
    <html lang='en'>
      <body>
        {/* <Provider> */}
          <div className='main'> {/* changes the background */}
            <div className='gradient' />
          </div>
  
          <main className='app'>
            <Nav />
            {children} {/* Displays metadata description + */}
          </main>
        {/* </Provider> */}
      </body>
    </html>
  );
  
  export default RootLayout;
  