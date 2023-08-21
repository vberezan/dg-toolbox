export class ResourceStats {
    private _ground: number = 0;
    private _orbit: number = 0;
    private _metal: number = 0;
    private _mineral: number = 0;
    private _food: number = 0;
    private _energy: number = 0;


    get ground(): number {
        return this._ground;
    }

    set ground(value: number) {
        this._ground = value;
    }

    get orbit(): number {
        return this._orbit;
    }

    set orbit(value: number) {
        this._orbit = value;
    }

    get metal(): number {
        return this._metal;
    }

    set metal(value: number) {
        this._metal = value;
    }

    get mineral(): number {
        return this._mineral;
    }

    set mineral(value: number) {
        this._mineral = value;
    }

    get food(): number {
        return this._food;
    }

    set food(value: number) {
        this._food = value;
    }

    get energy(): number {
        return this._energy;
    }

    set energy(value: number) {
        this._energy = value;
    }
}
