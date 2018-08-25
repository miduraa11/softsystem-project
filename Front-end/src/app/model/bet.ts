import { Member } from "./member";
import { Event } from "./event";
import { User } from "./user";

export class Bet {
    id: number;
    amount: number;
    betResult: Boolean;
    prize: number;
    result: String;
    isGeneral: Boolean;
    member: Member;
    event: Event;
    user: User;
}