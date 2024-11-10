import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Github],
  callbacks: {
    /**
     * Handles user sign in
     * - Checks if user exists in Sanity database
     * - If not, creates new author document with GitHub profile data
     * - Always returns true to allow sign in to complete
     */
    async signIn({
      user: { name, email, image },
      profile,
    }) {
      if (!profile) {
        return false;
      }
      const { id, login, bio } = profile;
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: id,
          name: name,
          username: login,
          email: email,
          image: image,
          bio: bio || "",
        });
      }
      return true;
    },

    /**
     * Handles JWT token creation/updates
     * - Called whenever a JWT is created/updated
     * - Fetches user data from Sanity to get internal _id
     * - Adds Sanity _id to the JWT token
     */
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },

    /**
     * Handles session creation/updates
     * - Called whenever a session is created/accessed
     * - Adds the Sanity _id from JWT token to the session
     */
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
