import { Member } from "./member";

export class Bet {
    id: number;
    amount: number;
    betResult: Boolean;
    prize: number;
    member: Member;
    general: Boolean;
}