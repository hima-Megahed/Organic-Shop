
export class ShoppingCartItem {
    productKey: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    category: string;

    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }
    get totalPrice(){
        return (this.quantity) ? this.price * this.quantity : 0;
    }
}