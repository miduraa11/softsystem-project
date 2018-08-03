package com.softsystem.Backend.controllers;

import com.softsystem.Backend.Model.Human;
import com.softsystem.Backend.Repository.HumanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/human")
public class HumanController {
    @Autowired
    HumanRepository humanRepository;

    @PostMapping(path = "/add")
    public void addHuman(Human human){
    humanRepository.save(human);

    }
}
