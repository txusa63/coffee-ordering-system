import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const FormerSales = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios.get('/api')
            .then(response => {
                if(response.statusText === 'OK') {
                    setSales(response.data)
                }
            })
    },[])

    return (
        <div>
            <h4>Customer Data</h4>
            {
                sales.map(sale => {
                    return (
                        <ul key={sale.div} style={{alignContent: 'end'}}>
                            <li>
                                <Link to={'/sales/' + sale.id} style={{textDecoration: 'none'}} >{sale.customer}</Link>
                            </li>
                        </ul>
                    )
                })
            }
        </div>
    )
}
