export interface IPizza {
    category: number;
    id: string;
    imageUrl: string;
    price: number;
    rating: number;
    sizes: number[];
    title: string;
    types: number[];
}

export interface ICartPizza {
    id: number;
    imageUrl: string;
    price: number;
    title: string;
    type: string;
    size: number;
    count: number;
}
