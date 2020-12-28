import React from 'react'
import Link from 'next/link'

const Header = () =>{
    return (
        <div className="bg-gray-200 p-4 shadow">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center">
                    <Link href="/">
                        <a href="/"><img src="/palpitebox.png" alt="palpitebox" /></a>
                    </Link>
                </div>
            </div>
            <div className="text-center p-4">
                <Link href="/">
                    <a className="px-2" >Home</a>
                </Link>
                <Link href="/sobre">
                    <a className="px-2" >sobre</a>
                </Link>
                <Link href="/pesquisa">
                    <a className="px-2" >pesquisa</a>
                </Link>
                <Link href="/contato">
                    <a className="px-2" >Contato</a>
                </Link>
            </div>
        </div>
    )
}

export default Header