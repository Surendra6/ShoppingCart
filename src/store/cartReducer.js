import * as actionTypes from './actions';
import update from 'react-addons-update';

const initialState = {
    cartItems: []
};

const cartReducer = ( state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_ITEM:
            var isItemExists = false;
            var duplicateIndex, quantity, price, itemTotal;
            state.cartItems.filter((item,index) =>{ 
                debugger;
                if(!isItemExists){
                    if(item.id === action.itemData.id){
                        duplicateIndex = index;
                        isItemExists = true;
                        quantity = item.quantity;
                        price = item.price;
                    }                        
                    else 
                        isItemExists = false;
                    return false;
                }
                else
                    return true;
            });            
            if(isItemExists){
                quantity = quantity + Number(action.itemData.quantity);
                itemTotal = quantity * Number(price);
                // Update only some properties of state
                return update(state, { 
                    cartItems: { 
                      [duplicateIndex]: {
                        quantity: {$set: quantity},
                        itemTotal: {$set: itemTotal}
                      }
                    }
                });
            }
            else {
                const newItem = {
                    id: action.itemData.id,
                    name: action.itemData.name,
                    price: action.itemData.price,
                    category: action.itemData.category,
                    image: action.itemData.image,
                    quantity: action.itemData.quantity,
                    itemTotal: action.itemData.quantity * action.itemData.price
                }
                return {
                    ...state,
                    cartItems: state.cartItems.concat(newItem)
                }
            }            
        case actionTypes.DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) =>{ 
                                return item.id !== action.id
                            })
            }
    }
    return state;
};

export default cartReducer;