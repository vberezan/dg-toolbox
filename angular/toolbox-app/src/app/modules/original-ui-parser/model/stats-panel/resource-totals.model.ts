export class ResourceTotals {
    private _totalGround: number = 0;
    private _totalOrbit: number = 0;
    private _totalMetal: number = 0;
    private _totalMineral: number = 0;
    private _totalFood: number = 0;
    private _totalEnergy: number = 0;

    set totalGround(value: number) {
        this._totalGround = value;
    }

    set totalOrbit(value: number) {
        this._totalOrbit = value;
    }

    set totalMetal(value: number) {
        this._totalMetal = value;
    }

    set totalMineral(value: number) {
        this._totalMineral = value;
    }

    set totalFood(value: number) {
        this._totalFood = value;
    }

    set totalEnergy(value: number) {
        this._totalEnergy = value;
    }

    get totalGround(): number {
        return this._totalGround;
    }

    get totalOrbit(): number {
        return this._totalOrbit;
    }

    get totalMetal(): number {
        return this._totalMetal;
    }

    get totalMineral(): number {
        return this._totalMineral;
    }

    get totalFood(): number {
        return this._totalFood;
    }

    get totalEnergy(): number {
        return this._totalEnergy;
    }
}
