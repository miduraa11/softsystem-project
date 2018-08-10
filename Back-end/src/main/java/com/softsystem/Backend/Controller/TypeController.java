package com.softsystem.Backend.Controller;


import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TypeController {
    @Autowired
    TypeService typeService;

    @GetMapping("/edit-teams/type")
    public List<Type> getAllType() {
        List<Type> types = new ArrayList<>();
        typeService.getAllType().forEach(types::add);
        return types;
    }

}
