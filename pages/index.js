import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from './Components/pageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () =>{
    const { data, error } = useSWR('/api/get-promo', fetcher)
    return(
        <div className="container mx-auto">
            <PageTitle title="Bem vindos!" />
            <div className="text-center p-8">
                <p>O restaurante X sempre busca por atender melhor seus clientes. <br/>Por isso, estamos sempre aberto a ouvir sua opinião.
                </p>
            </div>
            <div className="text-center m-8">
                <Link href="/pesquisa">
                    <a className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Dar Minha Sugestão</a>
                </Link>
            </div>
            <div className="text-center m-8">
                { !data &&  <p>Carregando...</p> }
                { !error && data && data.showCoupon && 
                    <p>{data.message}</p>     
                }
            </div>
        </div>
    )
}

export default Index