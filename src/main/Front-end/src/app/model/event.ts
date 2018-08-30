import { Type } from "./type";
import { Member } from "./member";
import { Bet } from "./bet";

export class Event {
    id: number;
    name: String;
    beginDate: Date;
    endDate: Date;
    active: Boolean;
    winner: String;
    score: String;
    type: Type;
    bets: Bet[];
    members: Member[];
}
