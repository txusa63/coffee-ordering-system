import React from 'react'
import { Container, Jumbotron } from 'reactstrap'


export const Home = () => {
    const items = [
        {
            src: '/cappuccino.jpg',
            altText: 'Slide 1',
            caption: 'Cappuccinos'
        },
        {
            src: '/espresso.jpg',
            altText: 'Slide 2',
            caption: 'Espresso'
        },
        {
            src: '/flat-white.jpg',
            altText: 'Slide 1',
            caption: 'Cappuccinos'
        },
        {
            src: '/latte1.jpeg',
            altText: 'Slide 1',
            caption: 'Cappuccinos'
        },
        {
            src: '/iced-coffee.png',
            altText: 'Slide 1',
            caption: 'Cappuccinos'
        },
        {
            src: '/frappuccino.jpg',
            altText: 'Slide 1',
            caption: 'Cappuccinos'
        }
    ]
    return (
        <div>
            <Jumbotron fluid >
                <Container fluid>
                <img src='/latte.jpg'  className='images' />
                    <img src='/flat-white.jpg'  className='images' />
                    <img src='/espresso.jpg'  className='images' />
                </Container>
                
            </Jumbotron>
        </div>
    )
}
