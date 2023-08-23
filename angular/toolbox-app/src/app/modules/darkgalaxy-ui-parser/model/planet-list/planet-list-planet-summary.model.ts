import {Resource} from "../common/resource.model";
import {Population} from "../common/population.model";

export class PlanetSummary {
  private _location: string[];

  get location(): string[] {
    return this._location;
  }

  set location(value: string[]) {
    this._location = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _resources: Resource[] = [];

  get resources(): Resource[] {
    return this._resources;
  }

  set resources(value: Resource[]) {
    this._resources = value;
  }

  private _ground: number = 0;

  get ground(): number {
    return this._ground;
  }

  set ground(value: number) {
    this._ground = value;
  }

  private _orbit: number = 0;

  get orbit(): number {
    return this._orbit;
  }

  set orbit(value: number) {
    this._orbit = value;
  }

  private _workers: Population = new Population();

  get workers(): Population {
    return this._workers;
  }

  set workers(value: Population) {
    this._workers = value;
  }

  private _soldiers: Population = new Population();

  get soldiers(): Population {
    return this._soldiers;
  }

  set soldiers(value: Population) {
    this._soldiers = value;
  }
}
