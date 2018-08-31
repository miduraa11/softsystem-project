package com.softsystem.backend.controller;

import com.softsystem.backend.DTO.AccountActivationDTO;
import com.softsystem.backend.DTO.ChangePasswordDTO;
import com.softsystem.backend.model.User;
import com.softsystem.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class UserController {

    @Autowired
    UserService userService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(value = "/user-panel/{userId}")
    public User getUserById(@PathVariable(name="userId")Long userId) {

        return userService.getUserById(userId);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping(value ="user-panel/change-password")
    public ResponseEntity changePassword(@RequestBody ChangePasswordDTO changePassword) {

        return ResponseEntity.ok(userService.changePassword(changePassword));
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping(value ="user-panel/accountActivation")
    public boolean accountActivation(@RequestBody AccountActivationDTO accountActivation) {

        return userService.checkSecretPassword(accountActivation);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value ="user-panel/change-activation-password")
    public void changeActivationPassword(@RequestBody String currentActivationPassword) {

        userService.changeActivationPassword(currentActivationPassword);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(value = "/user-panel/account/{userId}")
    public Object getAccount(@PathVariable(name="userId")Long userId) {
        return userService.getAccount(userId);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(value = "/user-panel/history/{userId}")
    public Object getHistory(@PathVariable(name="userId")Long userId) {
        return userService.getHistory(userId);
    }
}
