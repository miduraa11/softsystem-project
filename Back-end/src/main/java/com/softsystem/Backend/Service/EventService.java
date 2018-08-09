package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }


    public void deleteEvent(Long id) {  eventRepository.deleteById(id);    }


    public Event getOne(Long id) { return eventRepository.getOne(id);
    }


    public void updateEvent(Event event) {
        this.getOne(event.getId()).setName(event.getName());
        this.getOne(event.getId()).setName(event.getName());
        eventRepository.save(this.getOne(event.getId()));
    }
}
