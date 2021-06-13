import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router'

export const Delete = ({id}) => {
    const history = useHistory()

    const deleteSaleInformation = () => {
        axios.delete(`/api/${id}`)
            .then(response => {
                console.log(response.data)
                history.push('/')
            })
    }
    return (
        <div>
            <button onClick={deleteSaleInformation}>Delete</button>
        </div>
    )
}
