package com.softsystem.Backend.Model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "User")
public class User {

    @Id
    @SequenceGenerator(name="user_id_sequence", sequenceName = "user_seq", initialValue = 2, allocationSize = 1)
    @GeneratedValue(generator = "user_id_sequence", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_user")
    private long id;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user")
    private List <Bet> bets;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "id_user"), inverseJoinColumns = @JoinColumn(name = "rol_user"))
    private Set <Role> roles;

    public User() {
    }

    public User(Long id, String firstName, String lastName, String email, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
