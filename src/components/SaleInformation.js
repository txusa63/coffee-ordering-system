import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Delete } from './Delete'

export const SaleInformation = () => {
    const {id} = useParams()
    const [saleData, setSaleData] = useState('')

    useEffect(() => {
        axios.get(`/api/${id}`)
            .then(response => {
                setSaleData(response.data[0].order)
            })
    }, [id])

    const formattedData = () => {
        const newText = saleData.split('\n').map(str => <p>{str}</p>)

        return newText
    }


    return (
        <div>
            {formattedData()}
            <Delete id={id} />
            <hr></hr>
            <Link to='/sales/'>Return to Previous Sales</Link>
        </div>
    )
}
