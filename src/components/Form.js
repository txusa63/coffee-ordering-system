import axios from 'axios';
import React, { useState } from 'react'

export const Form = () => {
    const [totalSum, setTotalSum] = useState(0)
    const [customerName, setCustomerName] = useState('');
    const [drinkSize, setDrinkSize] = useState('Small');
    const [drinkType, setDrinkType] = useState('Cappuccino');
    const [milkType, setMilkType] = useState('Lowfat');
    const [caramel, setCaramel] = useState({name:'Caramel', added:false, qty:'0'});
    const [hazelnut, setHazelnut] = useState({name:'Hazelnut', added:false, qty:'0'});
    const [mocha, setMocha] = useState({name:'Mocha', added:false, qty:'0'});
    const [whiteMocha, setWhiteMocha] = useState({name:'White Mocha', added:false, qty:'0'});
    const [toffeeNut, setToffeeNut] = useState({name:'Toffee Nut', added:false, qty:'0'});
    const [pumpkin, setPumpkin] = useState({name:'Pumpkin', added:false, qty:'0'});
    const [vanilla, setVanilla] = useState({name:'Vanilla', added:false, qty:'0'});
    const [prices, setPrices] = useState({
        "Cappuccino": [2.50, 3.30, 4.00],
        "Latte": [3.00, 3.70, 4.30],
        "Espresso": [1.50, 2.25, 2.75],
        "Flat White": [3.50, 4.10, 4.70],
        "Iced Coffee": [2.25, 2.65, 2.95],
        "Frappuccino": [3.25, 3.95, 4.50]
    });
    
    const tag = (name, value, isDisabled, onChange) => {
        return (
            <label>
                Qty: {' '}
                <select
                    name={name}
                    value={value}
                    disabled={isDisabled}
                    onChange={onChange}
                >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>
        )
    }

    const handleCheck = (state, setState, e) => {
        setState({...state, [e.target.name]: e.target.checked})
    }

    const handleChange = (state, setState, e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const calculateSyrupPrices = (state) => {
        let currentTotal = 0

        if(state.added === true) {
            currentTotal += .50
            currentTotal += parseInt(state.qty)*.50
        }
        return currentTotal
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const states = [caramel, hazelnut, mocha, whiteMocha, toffeeNut, pumpkin, vanilla]
        const syrups = []
        let sum = 0
        console.log("The syrup array is ", syrups)

        for(const key in states) {
            if(states[key].added === true) {
                for(let i=0; i < parseInt(states[key].qty); i++){
                    syrups.push(states[key].name)
                }
            }
        }

        if(drinkSize === 'Small') {
            sum += prices[drinkType][0]
        }
        else if(drinkSize === 'Medium') {
            sum += prices[drinkType][1]
        }
        else{
            sum += prices[drinkType][2]
        }
        
        for(const key in states) {
            sum += calculateSyrupPrices(states[key])
        }
        setTotalSum(sum)

        let orderString = drinkSize + '\n- ' + drinkType + '\n- ' + milkType + '\n';
        for(let i in syrups) {
            orderString = orderString + '- ' + syrups[i] + '\n'
        }
        orderString = orderString + '$' + sum
        console.log(sum)

        console.log("orderString = ", orderString)

        const data = {
            customer: customerName,
            order: orderString,
        }

        const options = {
            headers: {
                "Content-type": "application/json"
            }
        }

        axios.post('/api/create', data, options)
            .then(response => {
                console.log("This is the data going to api: ", response.data)
                setTotalSum(0)
                setCustomerName('')
            })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>
                        Customer Name: {' '}
                        <input
                            type="text"
                            name="customerName"
                            value={customerName}
                            placeholder="Customer Name"
                            required
                            onChange={e => setCustomerName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Drink Size: {' '}
                        <select
                            name="drinkSize"
                            value={drinkSize}
                            onChange={e => setDrinkSize(e.target.value)}
                        >
                            <option value="Small" >Small</option>
                            <option value="Medium" >Medium</option>
                            <option value="Large" >Large</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Drink Type: {' '}
                        <select
                            name="drinkType"
                            value={drinkType}
                            onChange={e => setDrinkType(e.target.value)}
                        >
                            <option value="Cappuccino">Cappuccino</option>
                            <option value="Latte">Latte</option>
                            <option value="Espresso">Espresso</option>
                            <option value="Flat White">Flat White</option>
                            <option value="Iced Coffee">Iced Coffee</option>
                            <option value="Frappuccino">Frappuccino</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Select Type of Milk: {' '}
                        <select
                            name="milkType"
                            value={milkType}
                            onChange={e => setMilkType(e.target.value)}
                        >
                            <option value="Almond">Almond</option>
                            <option value="Cashew">Cashew</option>
                            <option value="Coconut">Coconut</option>
                            <option value="Lowfat">Lowfat</option>
                            <option value="Oatmeal">Oatmeal</option>
                            <option value="Soy">Soy</option>
                            <option value="Whole">Whole</option>
                        </select>
                    </label>
                </div>
                <label>Select Syrup(s): {' '}</label>
                <div className="form-group" style={{display: 'inline'}}>
                    <div>
                        <label >
                            <input
                                type="checkbox"
                                name="added"
                                checked={caramel.added}
                                onChange={e => handleCheck(caramel, setCaramel, e)}
                            />Caramel  {' | '}
                            {caramel.added ? tag("qty", caramel.qty, false, e => handleChange(caramel, setCaramel, e)) : tag("qty", caramel.qty, true, e => handleChange(caramel, setCaramel, e))}
                        </label>
                    </div>
                </div>
                <div className="form-group" >
                    <label>
                        <input
                            type="checkbox"
                            name="added"
                            checked={hazelnut.added}
                            onChange={(e) => handleCheck(hazelnut, setHazelnut, e)}
                        />Hazelnut  {' | '}
                        {hazelnut.added ? tag("qty", hazelnut.qty, false, e => handleChange(hazelnut, setHazelnut, e)) : tag("qty", hazelnut.qty, true, e => handleChange(hazelnut, setHazelnut, e))}
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="added"
                            checked={mocha.added}
                            onChange={(e) => setMocha({...mocha, [e.target.name]: e.target.checked})}
                        />Mocha  {' | '}
                        {mocha.added ? tag("qty", mocha.qty, false, e => handleChange(mocha, setMocha, e)) : tag("qty", mocha.qty, true, e => handleChange(mocha, setMocha, e))}
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="added"
                            checked={whiteMocha.added}
                            onChange={(e) => setWhiteMocha({...whiteMocha, [e.target.name]: e.target.checked})}
                        />White Mocha {' | '}
                        {whiteMocha.added ? tag("qty", whiteMocha.qty, false, e => handleChange(whiteMocha, setWhiteMocha, e)) : tag("qty", whiteMocha.qty, true, e => handleChange(whiteMocha, setWhiteMocha, e))}
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="added"
                            checked={toffeeNut.added}
                            onChange={(e) => setToffeeNut({...toffeeNut, [e.target.name]: e.target.checked})}
                        />Toffee Nut  {' | '}
                        {toffeeNut.added ? tag("qty", toffeeNut.qty, false, e => handleChange(toffeeNut, setToffeeNut, e)) : tag("qty", toffeeNut.qty, true, e => handleChange(toffeeNut, setToffeeNut, e))}
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="added"
                            checked={pumpkin.added}
                            onChange={(e) => setPumpkin({...pumpkin, [e.target.name]: e.target.checked})}
                        />Pumpkin  {' | '}
                        {pumpkin.added ? tag("qty", pumpkin.qty, false, e => handleChange(pumpkin, setPumpkin, e)) : tag("qty", pumpkin.qty, true, e => handleChange(pumpkin, setPumpkin, e))}
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="added"
                            checked={vanilla.added}
                            onChange={(e) => setVanilla({...vanilla, [e.target.name]: e.target.checked})}
                        />Vanilla  {' | '}
                        {vanilla.added ? tag("qty", vanilla.qty, false, e => handleChange(vanilla, setVanilla, e)) : tag("qty", vanilla.qty, true, e => handleChange(vanilla, setVanilla, e))}
                    </label>
                </div>
                <input type='submit'></input>
            </form>
        </div>
    )
}
