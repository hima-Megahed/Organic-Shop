import { ShoppingCart } from './shopping-cart';
export class Order {
    datePlaced: number;
    items: any[];
    totalCost: number;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.totalCost = shoppingCart.totalCost;
        
        this.items = shoppingCart.items.map(i => {
            return {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price,
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
    }
}