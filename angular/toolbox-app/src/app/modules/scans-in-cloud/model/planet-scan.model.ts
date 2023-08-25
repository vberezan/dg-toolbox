import {Resource} from "../../../model/resource.model";
import {Population} from "../../../model/population.model";
import {NameQuantity} from "../../../model/name-quantity.model";

export class PlanetScan {
  private _resources: Resource[] = [];
  private _ground: number = 0;
  private _orbit: number = 0;
  private _workers: Population = new Population();
  private _soldiers: number = 0;
  private _structures: NameQuantity[] = [];
  private _fleet: NameQuantity[] = [];
  private _location: string;

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get resources(): Resource[] {
    return this._resources;
  }

  set resources(value: Resource[]) {
    this._resources = value;
  }

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

  get workers(): Population {
    return this._workers;
  }

  set workers(value: Population) {
    this._workers = value;
  }

  get soldiers(): number {
    return this._soldiers;
  }

  set soldiers(value: number) {
    this._soldiers = value;
  }


  get structures(): NameQuantity[] {
    return this._structures;
  }

  set structures(value: NameQuantity[]) {
    this._structures = value;
  }

  get fleet(): NameQuantity[] {
    return this._fleet;
  }

  set fleet(value: NameQuantity[]) {
    this._fleet = value;
  }

  toJSON() {
    return {
      resources: this.resources,
      ground: this.ground,
      orbit: this.orbit,
      workers: this.workers,
      soldiers: this.soldiers,
      structures: this.structures,
      fleet: this.fleet,
      location: this.location
    }
  }
}
