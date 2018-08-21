package com.softsystem.Backend.DTO;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Member;

public class BetDTO {

    private long currentUser;
    private Event event;
    private float amount;
    private long chosenMember;
    private String result;
    private int betType;

    public BetDTO(long currentUser, Event event, float amount, long chosenMember, String result, int betType) {
        this.currentUser = currentUser;
        this.event = event;
        this.amount = amount;
        this.chosenMember = chosenMember;
        this.result = result;
        this.betType = betType;
    }

    public BetDTO() {
    }

    public long getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(long currentUser) {
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

    public long getChosenMember() {
        return chosenMember;
    }

    public void setChosenMember(long chosenMember) {
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
