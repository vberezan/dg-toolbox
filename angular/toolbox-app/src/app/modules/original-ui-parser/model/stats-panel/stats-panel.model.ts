import {ResourceTotals} from "./resource-totals.model";

export class StatsPanel {
    private _resourceTotals: Map<String, ResourceTotals> = new Map<String, ResourceTotals>();

    get resourceTotals(): Map<String, ResourceTotals> {
        return this._resourceTotals;
    }

}
