package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Event;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Model.User;
import com.softsystem.Backend.Service.EventService;
import com.softsystem.Backend.Service.MemberService;
import com.softsystem.Backend.Service.TypeService;
import com.softsystem.Backend.Service.UserService;
import com.softsystem.Backend.TransferData.EventData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Collection;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController {

    @Autowired
    EventService eventService;
    @Autowired
    MemberService memberService;
    @Autowired
    TypeService typeService;
    @Autowired
    UserService userService;

    /*------------------*/
    /*----- Events -----*/
    /*------------------*/

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


    @PostMapping(value= "/edit-events/edit")
    public void updateEvent(@RequestBody EventData eventData) {
        eventService.updateEvent(eventData.getEvents().get(0), eventData.getTypes().get(0), eventData.getMembers());

    }
  
    @PostMapping(value = "/edit-events/edit/{id}}")
    public String editEvent(@PathVariable Long id, @ModelAttribute("updateEvent") Event updateEvent) {
        eventService.updateEvent(updateEvent);
        return "redirect:edit-events";
    }

    @PostMapping(value = "/edit-events/add")
    public void addEvent(@RequestBody EventData eventData) {
        eventService.addEvent(eventData.getEvents().get(0), eventData.getTypes().get(0), eventData.getMembers());
    }

    /*-------------------*/
    /*----- Players -----*/
    /*-------------------*/

    @GetMapping(value = "/edit-players")
    public Collection<Member> showAllPlayers() {

        return memberService.getAllPlayers();
    }

    @DeleteMapping("/edit-players/{id}")
    public void deletePlayer(@PathVariable("id") long id) {
        memberService.deleteById(id);
    }

    @PostMapping(value= "/edit-players/edit/{id}/{name}/{discipline}")
    public void updatePlayer(@PathVariable("id") long id, @PathVariable("name") String name, @PathVariable("discipline") String discipline) {
        memberService.updateMember(id, name, discipline);
    }

    @GetMapping(value = "/edit-players/types")
    public Collection<Type> showAllIndividualTypes() {

        return typeService.getAllIndividualTypes();
    }

    @PostMapping(value= "/edit-players/add/{name}/{discipline}")
    public void addPlayer(@PathVariable("name") String name, @PathVariable("discipline") String discipline) {
        memberService.addMember(name, discipline);
    }

    /*------------------*/
    /*----- Teams ------*/
    /*------------------*/

    @GetMapping("/edit-teams")
    public List<Member> getAllTeam() {
        List<Member> teams = new ArrayList<>();
        memberService.getAllTeams().forEach(teams::add);
        return teams;
    }

    @DeleteMapping("/edit-teams/{id}")
    public void adminTeamDelete(@PathVariable(name="id")Long id) {
        memberService.deleteMember(id);
    }

    @PostMapping(value = "edit-teams/add/{name}/{idType}")
    public void addTeam(@PathVariable("name") String name, @PathVariable("idType") Long idType) {
        memberService.addTeam(name, idType);
    }

    @PostMapping(value = "edit-teams/edit/{id}/{name}/{idType}")
    public void editTeam(@PathVariable("id")long id, @PathVariable("name")String name, @PathVariable("idType") Long idType) {
        memberService.editMember(name, id, idType);
    }

    @GetMapping("/edit-teams/type")
    public List<Type> getAllTeamTypes() {
        List<Type> types = new ArrayList<>();
        typeService.getAllTeamTypes().forEach(types::add);
        return types;
    }

    /*------------------*/
    /*----- Users ------*/
    /*------------------*/

    @GetMapping(value = "/edit-users")
    public List<User> showAllUsers() {
        List<User> users = new ArrayList<>();
        userService.getAllUsers().forEach(users::add);
        return users;
    }

    @DeleteMapping("/edit-users/delete/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userService.deleteById(id);
    }

}
