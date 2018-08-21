package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Service.BetService;
import com.softsystem.Backend.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BetController {

    @Autowired
    BetService betService;

    private String chosenStatus;
    private Long currentUser;

    @GetMapping(value = "/bets/{userId}")
    public List<Bet> showAllBets(@PathVariable(name="userId")Long userId) {

        return betService.showAllBets(userId);
    }



    @GetMapping("/bets")
    public List<Bet> getActiveBets() {
        List<Bet> betList = new ArrayList<>();
        betService.findMatchingBets(this.chosenStatus, this.currentUser).forEach(betList::add);

        return betList;
    }

    @PostMapping(value = "/bets/{chosenStatus}/{currentUser}")
    public void getChosenParams(@PathVariable("chosenStatus") String chosenStatus,
                                @PathVariable("currentUser") Long currentUser) {
        this.chosenStatus = chosenStatus;
        this.currentUser = currentUser;
    }

}
