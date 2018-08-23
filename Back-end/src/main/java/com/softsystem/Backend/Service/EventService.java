package com.softsystem.Backend.Service;

import com.softsystem.Backend.DTO.UserListDTO;
import com.softsystem.Backend.Model.*;
import com.softsystem.Backend.Repository.EventRepository;
import com.softsystem.Backend.Repository.TypeRepository;
import com.softsystem.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Event> findAll() {

        return eventRepository.findAll();
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public Event getOne(Long id) {

        return eventRepository.getOne(id);
    }


    public void updateEvent(Event event, Type selectedDiscipline, List<Member> selectedMembers) {
       eventRepository.getOne(event.getId()).setName(event.getName());
       eventRepository.getOne(event.getId()).setBeginDate(event.getBeginDate());
       eventRepository.getOne(event.getId()).setEndDate(event.getEndDate());
       Type type;
       type = typeRepository.findByDiscipline(selectedDiscipline.getDiscipline());
       eventRepository.getOne(event.getId()).setType(type);
       eventRepository.getOne(event.getId()).setMembers(selectedMembers);
       eventRepository.save(eventRepository.getOne(event.getId()));
    }

    public void addEvent(Event event, Type selectedDiscipline, List<Member> selectedMembers) {
        Event newEvent = new Event();
        Type type;
        Member members = new Member();
        newEvent.setName(event.getName());
        newEvent.setBeginDate(event.getBeginDate());
        newEvent.setEndDate(event.getEndDate());
        newEvent.setActive(event.getActive());
        type = typeRepository.findByDiscipline(selectedDiscipline.getDiscipline());
        newEvent.setType(type);
        newEvent.setMembers(selectedMembers);
        eventRepository.save(newEvent);
    }

    public void resolve(Event event) {
        eventRepository.getOne(event.getId()).setWinner(event.getWinner());
        eventRepository.getOne(event.getId()).setScore(event.getScore());
        eventRepository.save(eventRepository.getOne(event.getId()));
    }

    public List<Event> findMatchingEvents(String chosenDiscipline, String chosenStatus) {
        List<Event> eventList;
        Boolean active;

        if(chosenDiscipline.equals("Wszystkie")) {
            if(chosenStatus.equals("Wszystkie")) {
                eventList = eventRepository.findAll();
            } else {
                active = this.isActive(chosenStatus);
                eventList = eventRepository.findAll()
                        .stream().filter(x -> x.getActive() == active)
                        .collect(Collectors.toList());
            }
        } else {
            if (chosenStatus.equals("Wszystkie")) {
                eventList = eventRepository.findAll()
                        .stream()
                        .filter(x -> x.getType().getDiscipline().equals(chosenDiscipline))
                        .collect(Collectors.toList());
            } else {
                active = this.isActive(chosenStatus);
                eventList = eventRepository.findAll()
                        .stream()
                        .filter(x -> x.getActive() == active)
                        .filter(x -> x.getType().getDiscipline().equals(chosenDiscipline))
                        .collect(Collectors.toList());
            }
        }

        return eventList;
    }

    private boolean isActive(String chosenStatus) {
        if(chosenStatus.equals("Aktywne")) { return true; }
        else { return false; }
    }

    public void checkEventsActivity() {
        List<Event> eventList;
        Date sysDate = new Date();
        eventList = eventRepository.findAll();
        eventList.forEach(
                x -> {
                    if(x.getEndDate().before(sysDate)) { x.setActive(false); }
                    if(x.getEndDate().after(sysDate)) { x.setActive(true); }
                    eventRepository.save(x);
                }

        );
    }

    public List<UserListDTO> getAllWinners(List<Bet> bet) {
        List listOfWinners = new ArrayList();
        List<Bet> betList;

        betList = bet
                .stream()
                .filter(x -> x.getBetResult() == true)
                .collect(Collectors.toList());

        int betListSize = betList.size();

        for (int i = 0; i < betListSize; ++i){
            User currentUser;
            float prize;
            currentUser = betList.get(i).getUser();
            prize = betList.get(i).getPrize();
            UserListDTO currentDTO = new UserListDTO(currentUser.getFirstName(), currentUser.getLastName(), prize);
            listOfWinners.add(currentDTO);
        }
        return listOfWinners;
    }
}
