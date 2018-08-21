package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Repository.BetRepository;
import com.softsystem.Backend.Repository.EventRepository;
import com.softsystem.Backend.Repository.MemberRepository;
import com.softsystem.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private MemberRepository memberRepository;

    public void addBet(long currentUser, Event event, float amount, long chosenMember, String result, int betType) {
        if(betType == 0) {
            Bet newBet = new Bet();
            newBet.setUser(userRepository.getOne(currentUser));
            newBet.setEvent(eventRepository.getOne(event.getId()));
            newBet.setMember(memberRepository.getOne(chosenMember));
            newBet.setAmount(amount);
            newBet.setGeneral(true);
            newBet.setBetResult(null);
            betRepository.saveAndFlush(newBet);
        } else {
            Bet newBet = new Bet();
            newBet.setUser(userRepository.getOne(currentUser));
            newBet.setEvent(eventRepository.getOne(event.getId()));
            newBet.setMember(memberRepository.getOne(chosenMember));
            newBet.setAmount(amount);
            newBet.setResult(result);
            newBet.setGeneral(false);
            newBet.setBetResult(null);
            betRepository.saveAndFlush(newBet);
        }
    }

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
