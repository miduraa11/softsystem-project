package com.softsystem.Backend.controllers;

import com.softsystem.Backend.Model.Human;
import com.softsystem.Backend.Repository.HumanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/human")
public class HumanController {
    @Autowired
    HumanRepository humanRepository;

    @PostMapping(path = "/add")
    public void addHuman(@RequestBody Human human){
    humanRepository.saveAndFlush(human);

    }

    @GetMapping
    public List<Human> get() {
        return humanRepository.findAll();
    }
}
