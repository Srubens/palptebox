import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({children}) =>{
    return(
        <React.Fragment>
            <Header/>
            <div className="">
                {children}
            </div>
            <Footer/>
        </React.Fragment>
    )
}

export default Layout