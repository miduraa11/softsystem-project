package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Repository.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class BetService {

    @Autowired
    BetRepository betRepository;

    public Collection<Bet> showAllBets(Long userId) { return betRepository.findAllBetsByUserId(userId);
    }


}
