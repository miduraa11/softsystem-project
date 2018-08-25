import { Member } from "./member";
import { Event } from "./event";

export class Type {
    id: number;
    discipline: String;
    individual: Boolean;
    members: Member[];
    events: Event[];
}
