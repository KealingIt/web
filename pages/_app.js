import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.querySelector("body").classList.add("appearance_" + (localStorage.getItem("appearance") || "default"))
  }, [])

  return <Component {...pageProps} />
}

export default MyApp;
