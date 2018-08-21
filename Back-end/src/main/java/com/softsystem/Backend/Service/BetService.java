package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Repository.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.geom.Arc2D;
import java.util.Optional;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    public double sumPrize(long idEvent){
        double prize =0.0;

        if(!betRepository.findById(idEvent).equals(Optional.empty()))
        {
            Bet sum[] = betRepository.allPrize(idEvent);
            for (Bet bet:sum) {
                prize= prize + bet.getAmount();
            }
            return prize;

        }
        else
            return prize;
    }

    public double calPrize(long idEvent){
        int winers=0;
        double onePrize = 0.0;
        //double percent[][] = new double[1][];
        double sumPrize = sumPrize(idEvent);
        Bet generalBet[] = betRepository.allIsGeneral(idEvent);
        Bet notGeneralBet[] = betRepository.allIsNotGeneral(idEvent);
        winers = generalBet.length + 5*notGeneralBet.length;
        onePrize = sumPrize/winers;
        for (Bet bet:generalBet) {

            bet.setPrize((float)onePrize/2 + bet.getAmount()/2);
            betRepository.saveAndFlush(bet);
        }
        for (Bet bet:notGeneralBet) {
            bet.setPrize((float)onePrize*5/2 + bet.getAmount()/2);
            betRepository.saveAndFlush(bet);
        }
        return sumPrize;
    }
}
