package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Service.EventService;
import com.softsystem.Backend.Service.MemberService;
import com.softsystem.Backend.Service.TypeService;
import com.softsystem.Backend.TransferData.EventData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController {

    @Autowired
    EventService eventService;
    @Autowired
    MemberService memberService;
    @Autowired
    TypeService typeService;

    @GetMapping("/edit-events")
    public EventData getAllEvents() {

        List<Event> events = new ArrayList<>();
        List<Member> members = new ArrayList<>();
        List<Type> types = new ArrayList<>();
        eventService.findAll().forEach(events::add);
        memberService.findAll().forEach(members::add);
        typeService.findAll().forEach(types::add);

        EventData eventData = new EventData(events, members, types);

        return eventData;
    }


    @DeleteMapping("/edit-events/{id}")
        public String adminEventDelete(@PathVariable(name="id")Long id) {
            eventService.deleteEvent(id);
            return "redirect:edit-events";
    }

    @GetMapping(value= "/edit-events/{id}}")
    public Event adminUserEdit(@PathVariable Long id) {
        Event event = eventService.getOne(id);
        return event;
    }

    @PostMapping(value = "/edit-events/{id}}")
    public String editEvent(@PathVariable Long id, @ModelAttribute("updateEvent") Event updateEvent) {
        eventService.updateEvent(updateEvent);
        return "redirect:edit-events";
    }
}
