import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-grey-500 text-white min-h-screen'>
        <div className="container">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
