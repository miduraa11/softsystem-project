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
