import { Event } from './model/event'; 

export const EVENTS: Event[] = [
  { id: 1, 
    name: "Barca-Real",  
    begin_Date: new Date("2018-08-23"), 
    end_Date: new Date("2018-08-25"), 
    active: true, 
    result: "Not specified yet" },
  { id: 2, 
    name: "PSG - Arsenal",  
    begin_Date: new Date("2018-08-23"), 
    end_Date: new Date("2018-08-25"), 
    active: false, 
    result: "Not specified yet" },
  { id: 3, 
    name: "Arka Gdynia - Legia Waszawa",  
    begin_Date: new Date("2018-08-23"), 
    end_Date: new Date("2018-08-25"), 
    active: true, 
    result: "Not specified yet" },
];