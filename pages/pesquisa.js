import React, {useState} from 'react'
import PageTitle from './Components/pageTitle'

const Pesquisa = () => {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        whatsapp: '',
        nota: 5
    })
    const notas = [0,1,2,3,4,5]
    const [sucess, setSucccess] = useState(false)
    const [retorno, setRetorno] = useState({})
    const save = async() =>{
        // return 1
        try{
            const response = await fetch('/api/save',{
                method:'POST',
                body:JSON.stringify(form)
            })
            const data = await response.json()
            setSucccess(true)
            setRetorno(data)
            // console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    const onChange = evt =>{
        const value = evt.target.value
        const key = evt.target.name
        setForm(old => ({
            ...old,
            [key]: value
        }))
    }

    return (
        <div className="container mx-auto">
            <PageTitle title="Pesquisa" />
            <div className="text-center my-8">
                <div className="my-4" >
                    <h1><b>Criticas e Sugestões</b></h1>
                </div>
                <div className="my-4" >
                    <p>O restaurante X sempre busca por atender melhor seus clientes. <br />Por isso, estamos sempre aberto a ouvir sua opinião.
                    </p>
                </div>
            </div>

            {!sucess && <div className="text-center" >
                <div className="my-6" >
                    <label className="font-bold"> Seu Nome:</label>
                    <input className="p-2 shadow mx-4 w-2/5 bg-blue-100 rounded" type="text" placeholder="Nome" 
                    name="nome" onChange={onChange} value={form.nome} />
                </div>
                <div className="my-6" >
                    <label className="font-bold"> Seu E-mail:</label>
                    <input className="p-2 shadow mx-4 w-2/5 bg-blue-100 rounded" type="email" placeholder="E-mail" 
                        name="email" onChange={onChange} value={form.email} />
                </div>
                <div className="my-6" >
                    <label className="font-bold">WhatsApp:</label>
                    <input className="p-2 shadow mx-4 w-2/5 bg-blue-100 rounded" type="text" placeholder="WhatsApp" 
                        name="whatsapp" onChange={onChange} value={form.whatsapp} />
                </div>
                <div className="my-6" >
                    <label className="font-bold">Sua sugestão:</label>
                    <textarea className="p-2 shadow mx-4 w-2/5 bg-blue-100 rounded" name="textarea" cols="10" rows="3"></textarea>
                </div>
                <div className="my-6" >
                    <label className="font-bold">Qual nota você daria para o Estabelecimento?</label>
                    <br/>
                    <br/>
                    <div className="flex flex-row items-center justify-center">
                        { notas.map( nota => {
                            return <label className="flex flex-col mr-8" >{nota}<input type='radio' name="nota" value={nota} onChange={onChange} /></label>
                        })} 
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={save}>Salvar</button>
                {/* <pre>
                    {JSON.stringify(form,null,2)}
                </pre> */}
            </div> }

            {sucess && <div className="text-center mx-auto" >
                <p className="mb-6" >Obrigado por entrar em contato conosco!</p>

                <div className="mb-6">
                    <p>Seu cupon é:</p>
                    {retorno.showCoupon && <div>{JSON.stringify(retorno.cumpon)}</div>}
                </div>
            </div>}

            {sucess && <div className="mb-6 text-center">
                <p>Promoção:</p>
                {retorno.showCoupon && <div>{JSON.stringify(retorno.promo)}</div>}
                Tire print ou foto desta tela para facilitar
            </div>}

        </div>
    )
}

export default Pesquisa