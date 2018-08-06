package com.softsystem.Backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "Member")
public class Member {

    @Id
    @SequenceGenerator(name="member_id_sequence", sequenceName = "member_seq", initialValue=2, allocationSize=1)
    @GeneratedValue(generator = "member_id_sequence", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_member")
    private Long id;

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

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
