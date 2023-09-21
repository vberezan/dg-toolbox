import {PlanetScan} from "./shared-scans-planet-scan.model";
import {ScanType} from "../scan-type";

export class PlanetScanEvent {
  private _planetScan: PlanetScan;
  private _type: ScanType;

  constructor(planetScan: PlanetScan, type: ScanType) {
    this._planetScan = planetScan;
    this._type = type;
  }

  get planetScan(): PlanetScan {
    return this._planetScan;
  }

  set planetScan(value: PlanetScan) {
    this._planetScan = value;
  }

  get type(): ScanType {
    return this._type;
  }

  set type(value: ScanType) {
    this._type = value;
  }
}
