package com.softsystem.Backend.DTO;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Type;
import java.util.List;

public class ActiveEventsDTO {

    private List<Event> events;
    private List <Type> types;
    private String chosenDiscipline;

    public ActiveEventsDTO(List<Event> events, List<Type> types, String chosenDiscipline) {
        this.events = events;
        this.types = types;
        this.chosenDiscipline = chosenDiscipline;
    }

    public ActiveEventsDTO() {

    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Type> getTypes() {
        return types;
    }

    public void setTypes(List<Type> types) {
        this.types = types;
    }

    public String getChosenDiscipline() { return chosenDiscipline; }

    public void setChosenDiscipline(String chosenDiscipline) { this.chosenDiscipline = chosenDiscipline; }
}
