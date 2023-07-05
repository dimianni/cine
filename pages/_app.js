import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { Rubik } from 'next/font/google'
import { Layout } from "@/components"

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={rubik.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  )
}