import { v4 as uuidv4 } from "uuid";
export enum Place {
    FRONT = "FRONT",
    MIDDLE = "MIDDLE",
    BACK = "BACK",
    NONE = "NONE",
}
export class Pupil {
    public uuid: string;
    public friend1: string | null = null;
    public friend2: string | null = null;
    public friend3: string | null = null;
    public name: string = "";
    public place: Place = Place.NONE;
    constructor() {
        this.uuid = uuidv4();
    }
}
