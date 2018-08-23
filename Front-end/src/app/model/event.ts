import { Type } from "./type";
import { Member } from "./member";

export class Event {
    id: number;
    name: String;
    beginDate: Date;
    endDate: Date;
    active: boolean;
    score: String;
    type: Type;
    members: Member[];
    winner: String;
}
