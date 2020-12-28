import React from 'react'
import Link from 'next/link'
import '../css/style.css'
import Layout from './Components/Layout'

const MyApp = ({ Component, pageProps }) =>{
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp