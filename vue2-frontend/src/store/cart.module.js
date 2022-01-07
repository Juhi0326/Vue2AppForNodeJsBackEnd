const lodash = require('lodash');
const {getSumQuantity, getSubtotal, getSumCharge} = require('../services/cartService')
const cartItems = JSON.parse(localStorage.getItem('cartItems'));


const initialState = cartItems ? cartItems : []
export const cart = {
    namespaced: true,
    state: initialState,
    getters: {
        getCartItems: state => {
            return state
        },
        SumOfQuantity: state => {
            return getSumQuantity(state)
        },
        sumOfCharge: state => {
            return getSumCharge(state)
        }
    },
    actions: {
        addProduct({ commit, getters }, product) {
            console.log('ide jön be, ez az action-ból jön: ' + product)
            let products = getters.getCartItems
            let productIndex = lodash.findIndex(getters.getCartItems, function (o) { return o._id === product._id; });
            if (productIndex < 0) {
                let subi = getSubtotal(product)
                console.log('ez a subi: ' + subi)
                product = {...product, ...{subTotal: subi}}
                console.log('Ez a mergelt product: ' + product.subTotal + 'és a diccounted price: ' + product.discountedPrice)
                products.push(product)
            } else {
                products[productIndex].quantity = products[productIndex].quantity + product.quantity
                let subTotal = getSubtotal(products[productIndex])
                console.log('ez a részösszeg: ' + subTotal)
                products[productIndex].subTotal = subTotal
            }
            
      
            localStorage.setItem('cartItems', JSON.stringify(products));

       
            commit('ADD_PRODUCT', products)
        },
        clearCart({ commit }) {

            commit('CLEAR_CART', [])
        }
    },
    mutations: {
        ADD_PRODUCT(state, products) {
            state = products
        },
        CLEAR_CART({state}, products) {
            state = products;
            console.log(state)
           
        }
    }

};