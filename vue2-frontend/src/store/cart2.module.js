const lodash = require('lodash');
const { getSumQuantity, getSubtotal, getSumCharge } = require('../services/cartService')
const cartItems2 = JSON.parse(localStorage.getItem('cartItems2'));

const getDefaultState = () => {
    return {
      items: []
    }
  }

const initialState = cartItems2 ? cartItems2 : getDefaultState()

export const cart2 = {
    namespaced: true,
    state: initialState,
    getters: {
        getCartItems2: state => {
            return state.items
        },
        SumOfQuantity: state => {
            return getSumQuantity(state.items)
        },
        sumOfCharge: state => {
            return getSumCharge(state.items)
        }
    },
    actions: {
        addProduct2({ commit, getters }, product) {
            let products =  getters.getCartItems2
            let productIndex = lodash.findIndex(getters.getCartItems2, function (o) { return o._id === product._id; });
            if (productIndex < 0) {
                let subi = getSubtotal(product)
                product = { ...product, ...{ subTotal: subi } }
                products.push(product)
            } else {
                products[productIndex].quantity = products[productIndex].quantity + product.quantity
                let subTotal = getSubtotal(products[productIndex])
                products[productIndex].subTotal = subTotal
            }
            localStorage.setItem('cartItems2', JSON.stringify({items:products}));
            
            commit('ADD_PRODUCT', products)
        },
        changeQuantityOfProductById({ commit, getters }, payload) {
            let productId = payload.productId
            let quantity = payload.quantity
            let products =  getters.getCartItems2
            let productIndex = lodash.findIndex(getters.getCartItems2, function (o) { return o._id === productId; });
            if (productIndex < 0) {
                console.log('nincs ilyen product id')
            } else {
                products[productIndex].quantity = quantity
                let subTotal = getSubtotal(products[productIndex])
                products[productIndex].subTotal = subTotal
                localStorage.setItem('cartItems2', JSON.stringify({items:products}));
                commit('CHANGE_QUANTITY_OF_PRODUCTS_BY_ID', products)
            }
        },
        deleteProductById({ commit }, productId) {
            commit('DELETE_PRODUCT', productId)
        },
        clearCart({ commit }) {
            commit('CLEAR_CART')
        }
    },
    mutations: {
        ADD_PRODUCT(state, products) {
            state = products
        },
        CHANGE_QUANTITY_OF_PRODUCTS_BY_ID(state, products) {
            state = products
        },
        CLEAR_CART(state) {
            Object.assign(state, getDefaultState())
        },
        DELETE_PRODUCT( state, productId) {
            state.items = state.items.filter( item => {
                return item._id !== productId
            })
        }
    }

};