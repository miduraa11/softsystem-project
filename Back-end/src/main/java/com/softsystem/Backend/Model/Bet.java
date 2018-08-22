package com.softsystem.Backend.Model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "Bet")
public class Bet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bet")
    private long id;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "betResult")
    private Boolean betResult;

    @Column(name = "prize")
    private Float prize;

    @Column(name = "result")
    private String result;

    @Column(name = "is_general")
    private boolean isGeneral;

    @JoinColumn(name = "id_member")
    @ManyToOne
    private Member member;

    @JoinColumn(name = "id_event")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Event event;

    @JoinColumn(name = "id_user")
    @ManyToOne
    private User user;


    public Bet() {
    }

    public Bet(Float amount, Boolean betResult, Float prize, String result) {
        this.amount = amount;
        this.betResult = betResult;
        this.prize = prize;
        this.result = result;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Boolean getBetResult() {
        return betResult;
    }

    public void setBetResult(Boolean betResult) {
        this.betResult = betResult;
    }

    public Float getPrize() {
        return prize;
    }

    public void setPrize(Float prize) {
        this.prize = prize;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isGeneral() {
        return isGeneral;
    }

    public void setGeneral(boolean general) {
        isGeneral = general;
    }
}