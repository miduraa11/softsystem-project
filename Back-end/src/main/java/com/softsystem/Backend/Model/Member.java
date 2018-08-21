package com.softsystem.Backend.Model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_member")
    private long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "id_type")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Type type;

    @ManyToMany(mappedBy = "members")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Event> events;

    public Member() {
    }

    public Member(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Type getType() { return type; }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(Type type) { this.type = type; }
}
