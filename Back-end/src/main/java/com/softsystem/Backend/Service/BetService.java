package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Repository.BetRepository;
import com.softsystem.Backend.Repository.EventRepository;
import com.softsystem.Backend.Repository.MemberRepository;
import com.softsystem.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
