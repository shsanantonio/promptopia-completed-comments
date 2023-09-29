'use client'; // Since we are using Browser's capabilities

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => ( //get current children of <Provider> in Layout.jsx, and data session through <Nav>
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;
