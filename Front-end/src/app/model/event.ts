import { Type } from "./type";
import { Member } from "./member";

export class Event {
    id: number;
    name: String;
    beginDate: Date;
    endDate: Date;
    active: boolean;
    result: string;
    type: Type;
    members: Member[];
}
