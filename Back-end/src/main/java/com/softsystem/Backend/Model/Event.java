package com.softsystem.Backend.Model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "Event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_event")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "begin_Date")
    private Date beginDate;

    @Column(name = "end_Date")
    private Date endDate;

    @Column(name = "active")
    private boolean active;

    @Column(name = "result")
    private String result;

    @JoinColumn(name = "id_type")
    @ManyToOne
    private Type type;

    @OneToMany(mappedBy = "event")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Bet> bets;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "event_member", joinColumns = @JoinColumn(name = "id_event"), inverseJoinColumns = @JoinColumn(name = "id_member"))
    private List <Member> members;

    public Event() {
    }

    public Event(Long id, String name, Date beginDate, Date endDate, boolean active, String result) {
        this.id = id;
        this.name = name;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.active = active;
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public boolean isActive() {
        return active;
    }

    public String getResult() {
        return result;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }
}
