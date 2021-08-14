import { useEffect } from 'react'
import Head from 'next/head'

export default function Home({ content }) {
  useEffect(() => {
    location.href = "/feed"
  }, [])

  return (<Head><title>Feed - KNN</title></Head>)
}