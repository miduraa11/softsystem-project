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
    private String betResult;

    @Column(name = "prize")
    private Float prize;

    @JoinColumn(name = "id_event")
    @ManyToOne
    private Event event;

    @JoinColumn(name = "id_user")
    @ManyToOne
    private User user;


    public Bet() {
    }

    public Bet(Float amount, String betResult, Float prize) {
        this.amount = amount;
        this.betResult = betResult;
        this.prize = prize;
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

    public String getBetResult() {
        return betResult;
    }

    public void setBetResult(String betResult) {
        this.betResult = betResult;
    }

    public Float getPrize() {
        return prize;
    }

    public void setPrize(Float prize) {
        this.prize = prize;
    }
}
