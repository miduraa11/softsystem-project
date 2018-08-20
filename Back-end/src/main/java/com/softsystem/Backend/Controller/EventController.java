package com.softsystem.Backend.Controller;

import com.softsystem.Backend.DTO.ActiveEventsDTO;
import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Service.EventService;
import com.softsystem.Backend.Service.MemberService;
import com.softsystem.Backend.Service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
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

    private String chosenDiscipline;
    private String chosenStatus;

    @GetMapping("/events")
    public ActiveEventsDTO getActiveEvents() {
        List<Event> events = new ArrayList<>();
        List<Type> types = new ArrayList<>();
        eventService.findMatchingEvents(this.chosenDiscipline, this.chosenStatus).forEach(events::add);
        typeService.findAll().forEach(types::add);
        ActiveEventsDTO activeEventsDTO = new ActiveEventsDTO(events, types, this.chosenDiscipline, this.chosenStatus);

        return activeEventsDTO;
    }

    @PostMapping(value = "/events/{chosenDiscipline}/{chosenStatus}")
    public void getChosenParams(@PathVariable("chosenDiscipline") String chosenDiscipline, @PathVariable("chosenStatus") String chosenStatus) {
        this.chosenDiscipline = chosenDiscipline;
        this.chosenStatus = chosenStatus;
    }

}
