package com.softsystem.backend.service;

import com.softsystem.backend.dto.UserListDTO;
import com.softsystem.backend.model.*;
import com.softsystem.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@EnableScheduling
public class EventService {

    protected final Logger log = Logger.getLogger(getClass().getName());

    @Autowired
    private EventRepository eventRepository;

    public List<Event> findAll() {

        return eventRepository.findAll();
    }

    public int deleteEvent(Long id) {
        try {
            eventRepository.deleteById(id);
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }

    public Event getOne(Long id) {

        return eventRepository.getOne(id);
    }

    public void updateEvent(Event event) {
       eventRepository.getOne(event.getId()).setName(event.getName());
       eventRepository.getOne(event.getId()).setBeginDate(event.getBeginDate());
       eventRepository.getOne(event.getId()).setEndDate(event.getEndDate());
       eventRepository.getOne(event.getId()).setType(event.getType());
       eventRepository.getOne(event.getId()).setMembers(event.getMembers());
       eventRepository.save(eventRepository.getOne(event.getId()));
       this.checkEventsActivity();
    }

    public Long addEvent(Event event) {
        Event newEvent = new Event();
        newEvent.setName(event.getName());
        newEvent.setBeginDate(event.getBeginDate());
        newEvent.setEndDate(event.getEndDate());
        newEvent.setActive(true);
        newEvent.setType(event.getType());
        newEvent.setMembers(event.getMembers());
        eventRepository.save(newEvent);
        this.checkEventsActivity();

        return newEvent.getId();
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
            } else if (chosenStatus.equals("Roztrzygnij")){
                eventList = eventRepository.findAll()
                        .stream().filter(x -> x.getWinner() == null)
                        .filter(x -> x.getActive() == false)
                        .collect(Collectors.toList());
            } else if (chosenStatus.equals("Aktywne")){
                eventList = eventRepository.findAll()
                        .stream().filter(x -> x.getWinner() == null)
                        .filter(x -> x.getActive() == true)
                        .collect(Collectors.toList());
            } else {
                eventList = eventRepository.findAll()
                        .stream().filter(x -> x.getWinner() != null)
                        .filter(x -> x.getActive() == false)
                        .collect(Collectors.toList());
            }
        } else {
            if (chosenStatus.equals("Wszystkie")) {
                eventList = eventRepository.findAll()
                        .stream()
                        .filter(x -> x.getType().getDiscipline().equals(chosenDiscipline))
                        .collect(Collectors.toList());
            } else if (chosenStatus.equals("Roztrzygnij")){
                eventList = eventRepository.findAll()
                        .stream().filter(x -> x.getWinner() == null)
                        .filter(x -> x.getActive() == false)
                        .filter(x -> x.getType().getDiscipline().equals(chosenDiscipline))
                        .collect(Collectors.toList());
            } else if (chosenStatus.equals("Aktywne")){
                eventList = eventRepository.findAll()
                        .stream().filter(x -> x.getWinner() == null)
                        .filter(x -> x.getActive() == true)
                        .filter(x -> x.getType().getDiscipline().equals(chosenDiscipline))
                        .collect(Collectors.toList());
            } else {
                eventList = eventRepository.findAll()
                        .stream().filter(x -> x.getWinner() != null)
                        .filter(x -> x.getActive() == false)
                        .filter(x -> x.getType().getDiscipline().equals(chosenDiscipline))
                        .collect(Collectors.toList());
            }
        }

        return eventList;
    }

    @Scheduled(fixedRate = 60000)
    public void checkEventsActivity() {
        List<Event> eventList;
        Date sysDate = new Date();
        eventList = eventRepository.findAll();
        eventList.forEach(
                x -> {
                    if(x.getEndDate().before(sysDate)) { x.setActive(false); }
                    if(x.getEndDate().after(sysDate)) { x.setActive(true); }
                }
        );
        eventRepository.saveAll(eventList);
        log.info("Events activity has been updated.");
    }

    public List<UserListDTO> getAllWinners(List<Bet> bet) {
        List listOfWinners = new ArrayList();
        List<Bet> betList;

        betList = bet
                .stream()
                .filter(x -> x.getBetResult() == true)
                .collect(Collectors.toList());

        int betListSize = betList.size();

        for(int i = 0; i < betListSize; ++i) {
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
