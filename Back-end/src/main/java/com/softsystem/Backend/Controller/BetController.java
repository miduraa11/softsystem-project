package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Service.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.Collection;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BetController {

    @Autowired
    BetService betService;
    

    @GetMapping(value = "/bets/{userId}")
    public Collection<Bet> showAllBets(@PathVariable(name="userId")Long userId) {

        return betService.showAllBets(userId);
    }

}
