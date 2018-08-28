import { Member } from "./member";
import { Event } from "./event";

export class Type {
    id: number;
    discipline: String;
    individual: Boolean;
    result: Boolean;
    members: Member[];
    events: Event[];
}
