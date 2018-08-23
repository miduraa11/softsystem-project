package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AppController {

    @Autowired
    private EventService eventService;

    @PostMapping(value = "/checkEventsActivity")
    public void checkEventsActivity() {
        eventService.checkEventsActivity();
    }
}
