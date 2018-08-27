package com.softsystem.backend.controller;

import com.softsystem.backend.model.Bet;
import com.softsystem.backend.service.BetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    private String chosenStatus;
    private Long currentUser;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(value = "/bets/{userId}")
    public List<Bet> showAllBets(@PathVariable(name="userId") Long userId) {

        return betService.showAllBets(userId);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/bets")
    public List<Bet> getActiveBets() {
        List<Bet> betList = new ArrayList<>();
        betService.findMatchingBets(this.chosenStatus, this.currentUser).forEach(betList::add);

        return betList;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping(value = "/bets/{chosenStatus}/{currentUser}")
    public void getChosenParams(@PathVariable("chosenStatus") String chosenStatus, @PathVariable("currentUser") Long currentUser) {
        this.chosenStatus = chosenStatus;
        this.currentUser = currentUser;
    }

}
