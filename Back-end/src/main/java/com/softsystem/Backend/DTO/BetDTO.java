package com.softsystem.Backend.DTO;

import com.softsystem.Backend.Model.Event;

public class BetDTO {

    private Long currentUser;
    private Event event;
    private float amount;
    private Long chosenMember;
    private String result;
    private int betType;

    public BetDTO(Long currentUser, Event event, float amount, Long chosenMember, String result, int betType) {
        this.currentUser = currentUser;
        this.event = event;
        this.amount = amount;
        this.chosenMember = chosenMember;
        this.result = result;
        this.betType = betType;
    }

    public BetDTO() {
    }

    public Long getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(Long currentUser) {
        this.currentUser = currentUser;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public Long getChosenMember() {
        return chosenMember;
    }

    public void setChosenMember(Long chosenMember) {
        this.chosenMember = chosenMember;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public int getBetType() {
        return betType;
    }

    public void setBetType(int betType) {
        this.betType = betType;
    }
}
