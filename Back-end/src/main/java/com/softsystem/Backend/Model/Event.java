package com.softsystem.Backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_event")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "begin_Date")
    private Date beginDate;

    @Column(name = "end_Date")
    private Date endDate;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "winner")
    private String winner;

    @Column(name = "score")
    private String score;

    @ManyToOne
    @JoinColumn(name = "id_type")
    private Type type;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private List<Bet> bets;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "event_member", joinColumns = @JoinColumn(name = "id_event"), inverseJoinColumns = @JoinColumn(name = "id_member"))
    private List<Member> members;

    public Event(String name, Date beginDate, Date endDate, Boolean active, String winner, String score, Type type, List<Bet> bets, List<Member> members) {
        this.name = name;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.active = active;
        this.winner = winner;
        this.score = score;
        this.type = type;
        this.bets = bets;
        this.members = members;
    }

    public Event() {
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

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public List<Bet> getBets() {
        return bets;
    }

    public void setBets(List<Bet> bets) {
        this.bets = bets;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }
}
