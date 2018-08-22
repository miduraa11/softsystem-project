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
    private Long id;

    @Column(name = "amount")
    private float amount;

    @Column(name = "betResult")
    private Boolean betResult;

    @Column(name = "prize")
    private float prize;

    @Column(name = "result")
    private String result;

    @Column(name = "is_general")
    private Boolean isGeneral;

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

    public Bet(float amount, Boolean betResult, float prize, String result, Boolean isGeneral, Member member, Event event, User user) {
        this.amount = amount;
        this.betResult = betResult;
        this.prize = prize;
        this.result = result;
        this.isGeneral = isGeneral;
        this.member = member;
        this.event = event;
        this.user = user;
    }

    public Bet() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public Boolean getBetResult() {
        return betResult;
    }

    public void setBetResult(Boolean betResult) {
        this.betResult = betResult;
    }

    public float getPrize() {
        return prize;
    }

    public void setPrize(float prize) {
        this.prize = prize;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Boolean getGeneral() {
        return isGeneral;
    }

    public void setGeneral(Boolean general) {
        isGeneral = general;
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

}
