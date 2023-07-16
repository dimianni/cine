import { signIn, signOut, getSession } from 'next-auth/react';
import { setUser, clearUser } from '../path/to/your/actions/authActions';

export default function nextAuthConfig(){
    return {
        callbacks: {
            async jwt({ token, account, profile }) {
                if (account) {
                    token.accessToken = account.access_token
                    if (profile && profile.id) {
                        token.id = profile.id;
                    }
                }
                return token
            },
            async session({ session, token }) {
                if (session?.user && token?.sub) {
                    session.user.id = token.sub;
                }
                return session;
            },

            async signIn(user, account, profile) {
                // Dispatch Redux action to set the user
                store.dispatch(setUser(user));
                return true;
            },
            async signOut() {
                // Dispatch Redux action to clear the user
                store.dispatch(clearUser());
                return true;
            },
        }
    }
}