package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Repository.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    public double[] sumPrize(long idEvent){
        double prize[] = new double[3];
        prize[0]=0.0;
        prize[1]=0.0;
        prize[2]=0.0;
        if(!betRepository.findById(idEvent).equals(Optional.empty()))
        {
            Bet sum[] = betRepository.allPrize(idEvent);
            for (Bet bet:sum) {
                prize[0]= prize[0] + bet.getAmount();
                if(bet.getBetResult()==true) {
                    prize[1]= prize[1] + bet.getAmount();
                    if(bet.isGeneral()==false)
                        prize[2]= prize[2] + bet.getAmount();
                }
            }
        }
        return prize;
    }

    public double calPrize(long idEvent){
        double bonusPrize;
        double withoutBonusPrize;
        double sumPrize[] = sumPrize(idEvent);
        if(sumPrize[0]>0.0) {
            if(sumPrize[1]>0) {
                Bet generalBet[] = betRepository.getAllIsGeneral(idEvent);
                Bet notGeneralBet[] = betRepository.getAllIsNotGeneral(idEvent);
                if(sumPrize[2]>0.0) {
                    if(sumPrize[1]-sumPrize[2]>0.0) {
                        withoutBonusPrize = (sumPrize[0] - sumPrize[1]) * 0.3;
                        bonusPrize = (sumPrize[0] - sumPrize[1]) * 0.7;
                    }
                    else{
                        withoutBonusPrize = 0.0;
                        bonusPrize = (sumPrize[0] - sumPrize[1]);
                    }
                }
                else{
                    withoutBonusPrize = (sumPrize[0] - sumPrize[1]);
                    bonusPrize = 0.0;
                }
                for (Bet bet : generalBet) {
                    bet.setPrize(
                            bet.getAmount() + (float) (withoutBonusPrize * bet.getAmount() / (sumPrize[1] - sumPrize[2]))
                    );
                    betRepository.saveAndFlush(bet);
                }

                for (Bet bet : notGeneralBet) {
                    bet.setPrize(
                            bet.getAmount() + (float) (bonusPrize * bet.getAmount() / sumPrize[2])
                    );
                    betRepository.saveAndFlush(bet);
                }
            }
            else{
                Bet allEventBet[] = betRepository.getAllByEvent(idEvent);
                for (Bet bet : allEventBet) {
                    bet.setPrize(
                            bet.getAmount()
                    );
                    betRepository.saveAndFlush(bet);
                }
            }
        }
        return sumPrize[0]-sumPrize[1];
    }
}
