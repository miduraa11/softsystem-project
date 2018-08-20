package com.softsystem.Backend.DTO;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import java.util.List;

public class EventDataDTO {

    private Event event;
    private List <Member> members;
    private List <Type> types;

    public Event getEvent() { return event; }

    public void setEvent(Event event) { this.event = event; }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public List<Type> getTypes() {
        return types;
    }

    public void setTypes(List<Type> types) {
        this.types = types;
    }

    public EventDataDTO(Event event, List<Member> members, List<Type> types) {
        this.event = event;
        this.members = members;
        this.types = types;
    }

    public EventDataDTO() {
    }

}
