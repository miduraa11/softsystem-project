package com.softsystem.Backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_member")
    private Long id;

    @Column(name = "name")
    private String name;

    @JoinColumn(name = "id_type")
    @ManyToOne
    private Type type;

    public Member(String name, Type type) {
        this.name = name;
        this.type = type;
    }

    public Member() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
