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
import java.util.Optional;
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
