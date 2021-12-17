const productMap = (product) => {
    return {
        imageUrl: product.imageUrl,
        productName: product.productName,
        priceRrp: product.priceRrp,
        priceShopify: product.priceShopify,
        priceAgent: product.priceAgent,
        price1212: product.price1212,
        priceSpecial: product.priceSpecial,
        desciption: product.desciption,
        weight: product.weight,
        packageQty: product.packageQty,
        productId: product.productId,
    }
}

const productColumns = (newData) => {
    return {
        "productName": newData.productName,
        "priceRrp": parseInt(newData.priceRrp),
        "priceShopify": parseInt(newData.priceShopify),
        "priceAgent": parseInt(newData.priceAgent),
        "price1212": parseInt(newData.price1212),
        "priceSpecial": parseInt(newData.priceSpecial),
        "desciption": newData.desciption,
        "weight": parseInt(newData.weight),
        "packageQty": parseInt(newData.packageQty),
        "productId": parseInt(newData.productId),
        "imageUrl": `{"url":"${newData.imageUrl}"}`
    }
}

const ProductService = {
    productMap,
    productColumns,
}

export default ProductService