package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Service.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BetController {

    @Autowired
    BetService betService;

    @GetMapping("/prize")
    public double calPrize(){//(@PathVariable(name="id")Long id){
        long id = 5;
        betService.calPrize(2);
        betService.calPrize(3);
        betService.calPrize(4);
        betService.calPrize(6);
        return betService.calPrize(id);
    }
}
