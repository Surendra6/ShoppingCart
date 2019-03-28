import React, {Component} from 'react';
import ShoppingCart from './components/ShoppingCart';

const PRODUCTS = [
	{category: 'Sporting Goods', price: '2000', stocked: true, name: 'Football', image: 'football.jpeg', modelNo: 'fb0001', ratings: { avgRatings: 3, numofusers: 20 }},	
	{category: 'Electronics', price: '5000', stocked: true, name: 'iPod Touch', image: 'ipod.jpeg', modelNo: 'ipod0002', ratings: { avgRatings: 3.9, numofusers: 87 }},
	{category: 'Electronics', price: '40000', stocked: false, name: 'iPhone 5', image: 'iphone5.jpeg', modelNo: 'ip0001', ratings: { avgRatings: 3.5, numofusers: 42 }},
	{category: 'Food', price: '100', stocked: false, name: 'Chocolates', image: 'chocolates.jpeg', modelNo: 'ch0001', ratings: { avgRatings: 2, numofusers: 25 }},
	{category: 'Food', price: '30', stocked: true, name: 'Biscuits', image: 'biscuits.jpeg', modelNo: 'bi0001', ratings: { avgRatings: 2.5, numofusers: 33 }},
	{category: 'Sporting Goods', price: '1500', stocked: false, name: 'Basketball', image: 'basketball.jpeg', modelNo: 'bb0001', ratings: { avgRatings: 2.3, numofusers: 29 }},
	{category: 'Electronics', price: '2100', stocked: true, name: 'Power Bank', image: 'powerbank.jpeg', modelNo: 'pb0009', ratings: { avgRatings: 1.5, numofusers: 120 }},
	{category: 'Sporting Goods', price: '1000', stocked: true, name: 'Baseball' , image: 'baseball.jpeg', modelNo: 'bb0010', ratings: { avgRatings: 2.75, numofusers: 101 }},	
	{category: 'Food', price: ' 40', stocked: true, name: 'DoNuts' , image: 'donuts.jpeg', modelNo: 'dn0001', ratings: { avgRatings: 2, numofusers: 39 }},
	{category: 'Clothes', price: '2500', stocked: true, name: 'Jeans' , image: 'jeans.jpeg', modelNo: 'j0001', ratings: { avgRatings: 2.8, numofusers: 53 }},
	{category: 'Clothes', price: '999', stocked: true, name: 'Shirts' , image: 'shirts.jpeg', modelNo: 'sh0001', ratings: { avgRatings: 4, numofusers: 47 }},
	{category: 'Clothes', price: '799', stocked: false, name: 'T-Shirts' , image: 'tshirts.jpeg', modelNo: 'tsh0001', ratings: { avgRatings: 3.2, numofusers: 55 }}
];

class App extends Component {
	state = {
		characters:[]
	};

	render() {
		return (
			<div>
				<ShoppingCart products={PRODUCTS}/>
		  </div>
		);		
	}
}

export default App;