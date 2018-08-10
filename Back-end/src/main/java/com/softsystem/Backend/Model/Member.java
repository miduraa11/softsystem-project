package com.softsystem.Backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_member")
    private long id;

    @Column(name = "name")
    private String name;

    @JoinColumn(name = "id_type")
    @ManyToOne
    private Type type;

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
