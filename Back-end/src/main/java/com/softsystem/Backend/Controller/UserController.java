package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.User;
import com.softsystem.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value = "/user-panel/{userId}")
    public User getUserById(@PathVariable(name="userId")Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping(value ="user-panel/change/{id}/{currentPassword}/{password}")
    public Object changePassword(@PathVariable("id")Long id, @PathVariable("currentPassword")String currentPassword, @PathVariable("password")String password){
        return userService.changePassword(id, currentPassword, password);
    }

    @GetMapping(value = "/user-panel/account/{userId}")
    public Object getAccount(@PathVariable(name="userId")Long userId) {
        return userService.getAccount(userId);
    }

    @GetMapping(value = "/user-panel/history/{userId}")
    public Object getHistory(@PathVariable(name="userId")Long userId) {
        return userService.getHistory(userId);
    }
}
