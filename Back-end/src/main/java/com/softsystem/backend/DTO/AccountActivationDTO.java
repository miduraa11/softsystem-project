package com.softsystem.backend.DTO;

public class AccountActivationDTO {

    private Long id;
    private String secretPassword;

    public AccountActivationDTO() {
    }

    public AccountActivationDTO(Long id, String secretPassword) {
        this.id = id;
        this.secretPassword = secretPassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSecretPassword() {
        return secretPassword;
    }

    public void setSecretPassword(String secretPassword) {
        this.secretPassword = secretPassword;
    }
}
