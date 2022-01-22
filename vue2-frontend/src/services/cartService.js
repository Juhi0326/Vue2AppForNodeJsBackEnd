const lodash = require('lodash');

const getSumQuantity = (products) => {
    var sum = 0
    lodash.forEach(products, function (value) {
        lodash.forEach(value, function (value2, key2) {
            if (key2 === 'quantity') {
                sum += value2
            }
        })
    });
    return sum
}

const getSubtotal = (product) => {
    let textLength = product.discountedPrice.length
    let discountedPrice = product.discountedPrice.substring(0, textLength - 3)
    discountedPrice = discountedPrice.replace(/\s+/g, '')
    return discountedPrice * product.quantity
}

const getSumCharge = (products) => {
    var sum = 0
    lodash.forEach(products, function (value) {
        lodash.forEach(value, function (value2, key2) {
            if (key2 === 'subTotal') {
                sum += value2
            }
        })
    });
    return sum
}



module.exports = { getSumQuantity, getSubtotal, getSumCharge }