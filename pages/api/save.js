import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCumpom = () =>{
    const code = parseInt(moment().format('YYMMDDHHmmss')).toString(16).toUpperCase()
    return `${code.substr(0,4)}-${code.substr(4,4)}-${code.substr(4,4)}`
}

export default async (req, res) => {

    try{
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        })
        //await doc.useServiceAccountAuth(credentials)
        await doc.loadInfo()

        //PEGANDO A PLANILHA
        const sheet = doc.sheetsByIndex[1]
        const data = JSON.parse(req.body)

        const sheetConfig = doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A2:B2')

        const mostrarPromocaoCell = sheetConfig.getCell(1, 0)
        const textCell = sheetConfig.getCell(1, 1)

        let cumpon = ''
        let promo = ''

        if(mostrarPromocaoCell.value === 'VERDADEIRO'){
            cumpon = genCumpom()
            promo = textCell.value
        }

        await sheet.addRow({
            nome: data.nome,
            email: data.email,
            whatsapp: data.whatsapp,
            cumpon,
            promo,
            'data preenchimento': moment().format('DD/MM/YYYY HH:mm:ss'),
            nota: parseInt(data.nota)
        })
        res.end(JSON.stringify({
            showCoupon: cumpon !== '',
            cumpon,
            promo
        }))
        console.log(JSON.parse(req.body))
    }catch(err){
        console.log(err)
        res.end('error')
    }
    
}