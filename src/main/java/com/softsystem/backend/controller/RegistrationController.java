package com.softsystem.backend.controller;

import com.softsystem.backend.model.User;
import com.softsystem.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({"/api"})
public class RegistrationController {

    @Autowired
    UserService userService;


    @PostMapping(value = "registration/add")
    public int addUser(@RequestBody User user) {
        userService.addUser(user);

        return 1;
    }


    @GetMapping(value = "registration/loginExist/{login}")
    public  Object emailExist(@PathVariable("login")String login){

        return userService.emailExist(login);
    }

}
