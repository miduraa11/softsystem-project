package com.softsystem.Backend.Controller;

import com.softsystem.Backend.DTO.ActiveEventsDTO;
import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Service.BetService;
import com.softsystem.Backend.Service.EventService;
import com.softsystem.Backend.Service.MemberService;
import com.softsystem.Backend.Service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@EnableScheduling
public class EventController {

    @Autowired
    EventService eventService;
    @Autowired
    MemberService memberService;
    @Autowired
    TypeService typeService;
    @Autowired
    BetService betService;

    @GetMapping("/events/{chosenDiscipline}/{chosenStatus}")
    public ActiveEventsDTO getActiveEvents(@PathVariable("chosenDiscipline") String chosenDiscipline, @PathVariable("chosenStatus") String chosenStatus) {
        List<Event> events = new ArrayList<>();
        List<Type> types = new ArrayList<>();
        eventService.findMatchingEvents(chosenDiscipline, chosenStatus).forEach(events::add);
        typeService.findAll().forEach(types::add);
        ActiveEventsDTO activeEventsDTO = new ActiveEventsDTO(events, types, chosenDiscipline, chosenStatus);

        return activeEventsDTO;
    }

    @PostMapping(value= "/events/addBet")
    public int addBet(@RequestBody Bet bet) {
        eventService.checkEventsActivity();

        return betService.addBet(bet);
    }

}
