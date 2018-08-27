package com.softsystem.backend.controller;

import com.softsystem.backend.dto.ActiveEventsDTO;
import com.softsystem.backend.model.Bet;
import com.softsystem.backend.model.Event;
import com.softsystem.backend.model.Type;
import com.softsystem.backend.service.BetService;
import com.softsystem.backend.service.EventService;
import com.softsystem.backend.service.MemberService;
import com.softsystem.backend.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EventController {

    @Autowired
    EventService eventService;
    @Autowired
    MemberService memberService;
    @Autowired
    TypeService typeService;
    @Autowired
    BetService betService;

    private String chosenDiscipline;
    private String chosenStatus;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/events")
    public ActiveEventsDTO getActiveEvents() {
        List<Event> events = new ArrayList<>();
        List<Type> types = new ArrayList<>();
        eventService.findMatchingEvents(this.chosenDiscipline, this.chosenStatus).forEach(events::add);
        typeService.findAll().forEach(types::add);
        ActiveEventsDTO activeEventsDTO = new ActiveEventsDTO(events, types, this.chosenDiscipline, this.chosenStatus);

        return activeEventsDTO;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping(value = "/events/{chosenDiscipline}/{chosenStatus}")
    public void getChosenParams(@PathVariable("chosenDiscipline") String chosenDiscipline, @PathVariable("chosenStatus") String chosenStatus) {
        this.chosenDiscipline = chosenDiscipline;
        this.chosenStatus = chosenStatus;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping(value= "/events/addBet")
    public void addBet(@RequestBody Bet bet) {
        betService.addBet(bet);
    }

}
