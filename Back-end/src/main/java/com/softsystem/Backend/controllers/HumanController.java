package com.softsystem.Backend.controllers;

import com.softsystem.Backend.Model.Human;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/human")
public class HumanController {
    @PostMapping(path = "/add")
    public void addHuman(Human human){


    }
}
