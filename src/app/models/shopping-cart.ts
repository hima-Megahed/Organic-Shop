import { ShoppingCartItem } from './shopping-cart-items';
import { Product } from './product';

export class ShoppingCart {
    dateCreated: Date;
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [key: string]: ShoppingCartItem } = {}) {
        Object.keys(itemsMap).forEach(productId => {
            this.items.push(new ShoppingCartItem({ productKey: productId, ...itemsMap[productId] }));
        });
    }

    get getTotalItemCount() {
        let shoppingCartItemCount = 0;
        for (let productId in this.itemsMap)
            shoppingCartItemCount += this.itemsMap[productId].quantity;
        return shoppingCartItemCount;
    }

    get totalCost() {
        return this.items.map(item => item.totalPrice || 0).reduce((acc, value) => acc + value, 0);;
    }

    getQuantity(product: Product) {
        let item: ShoppingCartItem = this.itemsMap[product.productKey];
        return item ? item.quantity : 0;
    }
}