package com.softsystem.Backend.Model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Type")
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private long id;

    @Column(name = "discipline")
    private String discipline;

    @Column(name = "individual")
    private boolean individual;

    @OneToMany(mappedBy = "type" )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List <Member> members;

    @OneToMany(mappedBy = "type")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List <Event> events;

    public Type() {
    }

    public Type(String discipline) {
        this.discipline = discipline;
    }

    public Long getId() {
        return id;
    }

    public String getDiscipline() {
        return discipline;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDiscipline(String discipline) {
        this.discipline = discipline;
    }

    public boolean isIndividual() {
        return individual;
    }

    public void setIndividual(boolean individual) {
        this.individual = individual;
    }
}
