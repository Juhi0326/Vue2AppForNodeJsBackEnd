const lodash = require('lodash');
const cartItems = JSON.parse(localStorage.getItem('cartItems'));
const initialState = cartItems ? cartItems : []
export const cart = {
    namespaced: true,
    state: initialState,
    getters: {
        getCartItems: state => {
            return state
        }
    },
    actions: {
        addProduct({ commit, getters }, product) {

            let products = getters.getCartItems
            let productIndex = lodash.findIndex(getters.getCartItems, function (o) { return o._id === product._id; });
            if (productIndex < 0) {
                products.push(product)
            } else {
                products[productIndex].quantity = products[productIndex].quantity + product.quantity
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
        CLEAR_CART(state, products) {
            state = [];
            console.log(products)
        }
    }

};