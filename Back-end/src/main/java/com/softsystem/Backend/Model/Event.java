package com.softsystem.Backend.Model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Event")
public class Event {

    @Id
    @SequenceGenerator(name="event_id_sequence", sequenceName = "event_seq", initialValue=2, allocationSize=1)
    @GeneratedValue(generator = "event_id_sequence", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_event")
    private Long id;

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
    private List<Bet> bets;

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

    public String getresult() {
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

    public void setresult(String result) {
        this.result = result;
    }
}
