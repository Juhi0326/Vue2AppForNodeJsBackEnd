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

            console.log('ide jön be, ez az action 2-ből jön: ' + product)
            let products =  getters.getCartItems2
            console.log('ez az első products object: ' + products)
            let productIndex = lodash.findIndex(getters.getCartItems2, function (o) { return o._id === product._id; });
            if (productIndex < 0) {
                let subi = getSubtotal(product)
                console.log('ez a subi: ' + subi)
                product = { ...product, ...{ subTotal: subi } }
                console.log('Ez a mergelt product: ' + product.subTotal + 'és a diccounted price: ' + product.discountedPrice)
                products.push(product)
            } else {
                products[productIndex].quantity = products[productIndex].quantity + product.quantity
                let subTotal = getSubtotal(products[productIndex])
                console.log('ez a részösszeg: ' + subTotal)
                products[productIndex].subTotal = subTotal
            }
            localStorage.setItem('cartItems2', JSON.stringify({items:products}));
            
            commit('ADD_PRODUCT', products)
        },
        deleteProduct({ commit }, product) {
            commit('DELETE_PRODUCT', product)
        },
        clearCart({ commit }) {
            commit('CLEAR_CART')
        }
    },
    mutations: {
        ADD_PRODUCT(state, products) {
            state = products
        },
        CLEAR_CART( state) {
            Object.assign(state, getDefaultState())
        },
        DELETE_PRODUCT( state, product) {
            state.items = state.items.filter( item => {
                return item._id !== product._id
            })
        }
    }

};