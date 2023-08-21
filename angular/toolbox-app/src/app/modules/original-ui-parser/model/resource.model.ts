export class Resource {
    private _name: string;
    private _quantity: number;
    private _abundance: number;
    private _production: number;

    constructor(name: string, quantity: number, abundance: number, production: number) {
        this._name = name;
        this._quantity = quantity;
        this._abundance = abundance;
        this._production = production;
    }


    get name(): string {
        return this._name;
    }

    get quantity(): number {
        return this._quantity;
    }

    get abundance(): number {
        return this._abundance;
    }

    get production(): number {
        return this._production;
    }
}
