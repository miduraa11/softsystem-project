package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Service.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BetController {

    @Autowired
    BetService betService;

    @GetMapping(value = "/bets/{userId}")
    public List<Bet> showAllBets(@PathVariable(name="userId") Long userId) {

        return betService.showAllBets(userId);
    }

    @GetMapping("/bets/{chosenStatus}/{currentUser}")
    public List<Bet> getActiveBets(@PathVariable("chosenStatus") String chosenStatus, @PathVariable("currentUser") Long currentUser) {
        List<Bet> betList = new ArrayList<>();
        betService.findMatchingBets(chosenStatus, currentUser).forEach(betList::add);

        return betList;
    }

}
