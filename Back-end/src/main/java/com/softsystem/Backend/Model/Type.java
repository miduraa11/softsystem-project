package com.softsystem.Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Type")
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type")
    private Long id;

    @Column(name = "discipline")
    private String discipline;

    @Column(name = "individual")
    private Boolean individual;

    @Column(name = "result")
    private Boolean result;

    @OneToMany(mappedBy = "type")
    @JsonIgnore
    private List<Member> members;

    @OneToMany(mappedBy = "type")
    @JsonIgnore
    private List<Event> events;

    public Type(String discipline, Boolean individual, Boolean result, List<Member> members, List<Event> events) {
        this.discipline = discipline;
        this.individual = individual;
        this.result = result;
        this.members = members;
        this.events = events;
    }

    public Type() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public Boolean getIndividual() {
        return individual;
    }

    public void setIndividual(Boolean individual) {
        this.individual = individual;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public Boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }
}
