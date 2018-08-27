package com.softsystem.backend.controller;

import com.softsystem.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {

    @Autowired
    UserService userService;

//    @GetMapping(value= "/login/{login}/{password}")
//    public Object getUserId(@PathVariable String login, @PathVariable String password) {
//        Long id;
//        boolean userStatus;
//        userStatus = userService.authUser(login, password);
//
//        if(userStatus){ id = userService.getUserId(login); }
//        else { id = null; }
//
//        return id;
//    }
//
//    @GetMapping(value= "/login/{userId}")
//    public Object getUserRole(@PathVariable Long userId) {
//        String userRole = userService.getUserRole(userId);
//
//        return userRole;
//    }

}
