import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

class Cart extends Component {
    deleteClickHandler(item) {
        this.props.onDeleteItemClicked(item);
    }

    cartList = props => {
        const itemsList = [];
        props.cartItems.forEach(item => {

            itemsList.push(
                <div className="cartItem">
                    <div className="cartItemImage">
                        <img className="productImage" src={require('../images/' + item.image)} alt="Img"/>
                    </div>
                    <div className="cartItemDetails">
                        <div className="cartDetailsHeight">
                            <span>{item.name}</span>
                            <span className="alignRight productPrice">{'₹ '+item.itemTotal}</span>
                        </div>
                        <div className="cartDetailsHeight">
                            <span>Quantity</span><span>: {item.quantity}</span>
                            <span key={item} onClick={() => {this.deleteClickHandler(item)}} className="alignRight cartDelete"><i className="fa fa-trash"></i></span>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            itemsList
        );
    };
    render() {
        const cartItems = this.props.cartItems;
        return (
            <div className={this.props.className}><this.cartList cartItems={cartItems} /></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddItemClicked: (item) => dispatch({
            type: actionTypes.ADD_ITEM, itemData: { name: item.name, price: item.price, category: item.category, image: item.image }
        }),
        onDeleteItemClicked: (item) => dispatch(
            { type: actionTypes.DELETE_ITEM, id: item.id }
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);