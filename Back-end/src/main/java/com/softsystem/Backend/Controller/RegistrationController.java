package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.User;
import com.softsystem.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RegistrationController {

    @Autowired
    UserService userService;

    @PostMapping(value ="registration/add/{userFirstName}/{userLastName}/{userEmail}/{userPassword}")
    public void addUser(@PathVariable("userFirstName")String userFirstName, @PathVariable("userLastName")String userLastName,@PathVariable("userEmail") String userEmail, @PathVariable("userPassword")String userPassword){
        userService.addUser(userFirstName, userLastName, userEmail, userPassword);
    }
}
