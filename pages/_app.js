import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { Rubik } from 'next/font/google'
import Layout from "@/Layout/Layout"
import { Provider } from "react-redux"
import store from "@/redux/store"
import UserInfo from "@/Layout/UserInfo"


const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <UserInfo>
          <div className={rubik.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </UserInfo>
      </SessionProvider>
    </Provider>
  )
}