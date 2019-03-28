import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

class FilterableProductTable extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	filterText: '',
	      	inStockOnly: false,
	      	category: 'All'
	    };
	    
	    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
	    this.handleInStockChange = this.handleInStockChange.bind(this);
	    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  	}

	handleFilterTextChange(filterText) {
		this.setState({
		  	filterText: filterText
		});
	}
  
	handleInStockChange(inStockOnly) {
		this.setState({
		  	inStockOnly: inStockOnly
		})
	}

	handleCategoryChange(category) {
		this.setState({
		  	category: category
		})
	}

	render() {
		return (
			<div className={this.props.className}>
				<SearchBar
					products = {this.props.products}
          			inStockOnly = {this.state.inStockOnly}
          			category = {this.state.category}
          			onInStockChange = {this.handleInStockChange}
          			onCategoryChange = {this.handleCategoryChange}
        		/>

				<ProductTable
          			products={this.props.products}
          			filterText={this.props.filterText}
          			inStockOnly={this.state.inStockOnly}
          			category = {this.state.category}
					itemsCount = {this.state.itemsCount}
					onAddItemClicked={() => this.props.onAddItemClicked}
        		/>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItemClicked: (item, quantity) => dispatch({
			type: actionTypes.ADD_ITEM, 
			itemData: {
				id: item.name,
				name: item.name, 
				price: item.price, 
				category: item.category, 
				image: item.image,
				quantity: quantity
			}
		})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (FilterableProductTable);