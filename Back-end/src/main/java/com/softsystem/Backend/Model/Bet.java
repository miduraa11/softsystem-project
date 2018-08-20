package com.softsystem.Backend.Model;

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
    private boolean betResult;

    @Column(name = "prize")
    private Float prize;

    @Column(name = "result")
    private String result;

    @JoinColumn(name = "id_member")
    @ManyToOne
    private Member member;

    @JoinColumn(name = "id_event")
    @ManyToOne
    private Event event;

    @JoinColumn(name = "id_user")
    @ManyToOne
    private User user;


    public Bet() {
    }

    public Bet(Float amount, boolean betResult, Float prize, String result) {
        this.amount = amount;
        this.betResult = betResult;
        this.prize = prize;
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public boolean getBetResult() {
        return betResult;
    }

    public void setBetResult(boolean betResult) {
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
}
