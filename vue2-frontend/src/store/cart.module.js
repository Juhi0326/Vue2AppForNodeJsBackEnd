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
        addProduct({ commit, getters }, product, quantity) {
            let products = getters.getCartItems
            let productIndex = lodash.findIndex(getters.getCartItems, function (o) { return o._id === product._id; });
            if (productIndex < 0) {
                console.log('nem volr találat, hozzáadható az új product a kosárhoz')
                products.push(product)
                console.log(quantity)

            } else {
                let productQuantity = parseInt(getters.getCartItems[productIndex].quantity) + 1
                console.log("a termék már benne volt az új mennyiség: " + productQuantity)
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