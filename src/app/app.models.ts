export interface Ingredient{
    _id: string;
    title: string;
};

export interface Drink{
        _id: string;
        name: string;
        cost: number;
        ingredients:Ingredient[]; 
    }

export interface Order{
    _id: string;
    drink: Drink[];
    number: number;
    time: Date;
    ready: boolean;
}