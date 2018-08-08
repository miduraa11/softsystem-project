package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController {

    @Autowired
    EventService eventService;

    @GetMapping("/edit-events")
    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventService.findAll().forEach(events::add);

        return events;
    }

    @DeleteMapping("/edit-events/{id}")
        public String adminEventDelete(@PathVariable(name="id")Long id) {
            eventService.deleteEvent(id);
            return "redirect:edit-events";
    }
}
