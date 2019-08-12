import { ShoppingCartItem } from './shopping-cart-items';

export class ShoppingCart {
    dateCreated: Date;
    items: ShoppingCartItem[] = [];
    constructor(public itemsMap: {[key: string]: ShoppingCartItem}){
        Object.keys(itemsMap).forEach(productId => {
            this.items.push(new ShoppingCartItem(itemsMap[productId].product, itemsMap[productId].quantity));
        });
    }

    get getTotalItemCount() {
        let shoppingCartItemCount = 0;
        for (let productId in this.itemsMap)
            shoppingCartItemCount += this.itemsMap[productId].quantity;
        return shoppingCartItemCount;
    }

    get totalCost(){
        return this.items.map(item => item.totalPrice || 0).reduce((acc, value) => acc + value, 0);;
    }
}