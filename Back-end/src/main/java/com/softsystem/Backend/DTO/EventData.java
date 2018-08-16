package com.softsystem.Backend.DTO;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import java.util.List;

public class EventData {

    private List <Event> events;
    private List <Member> members;
    private List <Type> types;


    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

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

    public EventData(List<Event> events, List<Member> members, List<Type> types) {
        this.events = events;
        this.members = members;
        this.types = types;
    }

    public EventData() {
    }

}
