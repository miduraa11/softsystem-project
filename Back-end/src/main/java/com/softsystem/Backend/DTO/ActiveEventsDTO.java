package com.softsystem.Backend.DTO;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Type;
import java.util.List;

public class ActiveEventsDTO {

    private List<Event> events;
    private List <Type> types;
    private String chosenDiscipline;
    private String chosenStatus;

    public ActiveEventsDTO(List<Event> events, List<Type> types, String chosenDiscipline, String chosenStatus) {
        this.events = events;
        this.types = types;
        this.chosenDiscipline = chosenDiscipline;
        this.chosenStatus = chosenStatus;
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

    public String getChosenStatus() { return chosenStatus; }

    public void setChosenStatus(String chosenStatus) { this.chosenStatus = chosenStatus; }
}
