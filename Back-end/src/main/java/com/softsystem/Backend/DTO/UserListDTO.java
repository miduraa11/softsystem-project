package com.softsystem.Backend.DTO;

public class UserListDTO {
    private String firstName;
    private String lastName;
    private float prize;

    public UserListDTO(String firstName, String lastName, float prize) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.prize = prize;
    }

    public UserListDTO() {
    }

    public String getUserFirstName() {
        return firstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.firstName = userFirstName;
    }

    public String getUserLastname() {
        return lastName;
    }

    public void setUserLastname(String userLastName) {
        this.lastName = userLastName;
    }

    public float getUserPrize() {
        return prize;
    }

    public void setUserPrize(float userPrize) {
        this.prize = userPrize;
    }
}
