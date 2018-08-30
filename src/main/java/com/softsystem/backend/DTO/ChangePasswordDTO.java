package com.softsystem.backend.DTO;

public class ChangePasswordDTO {
    private Long id;
    private String currentPassword;
    private String password;

    public ChangePasswordDTO(Long id, String currentPassword, String password) {
        this.id = id;
        this.currentPassword = currentPassword;
        this.password = password;
    }

    public ChangePasswordDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
