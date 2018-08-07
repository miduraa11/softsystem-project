package com.softsystem.Backend.Model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Type")
public class Type {

    @Id
    @SequenceGenerator(name="type_id_sequence", sequenceName = "type_seq", initialValue=2, allocationSize=1)
    @GeneratedValue(generator = "type_id_sequence", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_type")
    private long id;

    @Column(name = "discipline")
    private String discipline;

    @OneToMany(mappedBy = "type")
    private List <Member> members;

    @OneToMany(mappedBy = "type")
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
}
