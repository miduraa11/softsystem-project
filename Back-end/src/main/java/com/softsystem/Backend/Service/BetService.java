package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Repository.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BetService {

    @Autowired
    BetRepository betRepository;

    public List<Bet> showAllBets(Long userId) { return betRepository.findAllBetsByUserId(userId);
    }

    public List<Bet> findMatchingBets(String chosenStatus, Long currentUser) {
        List<Bet> betList;
        Boolean active;

        if(chosenStatus.equals("Wszystkie")) {
            betList = showAllBets(currentUser);
        } else if(chosenStatus.equals("Wygrane")) {
            active = this.isActive(chosenStatus);
            betList = showAllBets(currentUser)
                    .stream().filter(x -> x.getBetResult() == active)
                    .collect(Collectors.toList());
        } else if(chosenStatus.equals("Przegrane")) {
            active = this.isActive(chosenStatus);
            betList = showAllBets(currentUser)
                    .stream().filter(x -> x.getBetResult() == active)
                    .collect(Collectors.toList());
        } else {
            active = this.isActive(chosenStatus);
            betList = showAllBets(currentUser)
                    .stream().filter(x -> x.getBetResult() == active)
                    .collect(Collectors.toList());
        }

        return betList;
    }

    private Boolean isActive(String chosenStatus) {
        if(chosenStatus.equals("Wygrane")) { return true; }
        else if (chosenStatus.equals("Przegrane")){ return false; }
        else { return null;}
    }
}
