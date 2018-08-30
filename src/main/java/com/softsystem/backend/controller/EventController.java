package com.softsystem.backend.controller;

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

//@CrossOrigin(origins = "http://localhost:8080")
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

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/events/{chosenDiscipline}/{chosenStatus}")
    public List<Event> getActiveEvents(@PathVariable("chosenDiscipline") String chosenDiscipline, @PathVariable("chosenStatus") String chosenStatus) {
        List<Event> events = new ArrayList<>();
        eventService.findMatchingEvents(chosenDiscipline, chosenStatus).forEach(events::add);

        return events;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostMapping(value = "/events/addBet")
    public int addBet(@RequestBody Bet bet) {
        eventService.checkEventsActivity();

        return betService.addBet(bet);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping(value = "/events/getTypes")
    public List<Type> getTypes() {
        List<Type> types = new ArrayList<>();
        typeService.findAll().forEach(types::add);

        return types;
    }

}
