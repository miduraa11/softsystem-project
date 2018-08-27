import { Bet } from "./bet";
import { Role } from "./role";

export class User {
    id: number;
    login: String;
    firstName: String;
    lastName: String;
    email: String;
    password: any;
    bets: Bet[];
    roles: Role[];
}
