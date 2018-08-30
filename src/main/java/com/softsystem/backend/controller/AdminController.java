package com.softsystem.backend.controller;

import com.softsystem.backend.dto.UserListDTO;
import com.softsystem.backend.model.*;
import com.softsystem.backend.service.*;
import com.softsystem.backend.dto.EditEventsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Collection;

@CrossOrigin(origins = "http://localhost:8080")
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
    @Autowired
    BetService betService;

    /*------------------*/
    /*----- Events -----*/
    /*------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-events")
    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventService.findAll().forEach(events::add);

        return events;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-events/info")
    public EditEventsDTO getTypesAndMembers() {
        List<Member> members = new ArrayList<>();
        List<Type> types = new ArrayList<>();
        memberService.findAll().forEach(members::add);
        typeService.findAll().forEach(types::add);
        EditEventsDTO editEventsDTO = new EditEventsDTO(members, types);

        return editEventsDTO;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-events/{id}")
    public int adminEventDelete(@PathVariable(name="id")Long id) {

        return eventService.deleteEvent(id);
    }

    @PostMapping(value= "/edit-events/edit")
    public void updateEvent(@RequestBody Event event) {
        eventService.updateEvent(event);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value= "/edit-events/add")
    public Long addEvent(@RequestBody Event event) {

        return eventService.addEvent(event);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/edit-events/resolve")
    public void resolveEvent(@RequestBody Event event) {
        eventService.resolve(event);
        betService.resolveBets(event);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-events/userList/{eventId}")
    public List<UserListDTO> getUserList(@PathVariable(name="eventId")Long eventId) {
        List<Bet> bet;
        bet = Arrays.asList(betService.getAllBetsByEventId(eventId));

        return eventService.getAllWinners(bet);
    }

    /*-------------------*/
    /*----- Players -----*/
    /*-------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/edit-players")
    public Collection<Member> showAllPlayers() {

        return memberService.getAllPlayers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-players/{id}")
    public int deletePlayer(@PathVariable("id") Long id) {

        return memberService.deleteMember(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value= "/edit-players/edit")
    public void updatePlayer(@RequestBody Member player) {
        memberService.updateMember(player);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/edit-players/types")
    public Collection<Type> showAllIndividualTypes() {

        return typeService.getAllIndividualTypes();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value= "/edit-players/add")
    public Long addPlayer(@RequestBody Member player) {

        return memberService.addMember(player);
    }

    /*------------------*/
    /*----- Teams ------*/
    /*------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-teams")
    public List<Member> getAllTeam() {
        List<Member> teams = new ArrayList<>();
        memberService.getAllTeams().forEach(teams::add);

        return teams;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-teams/{id}")
    public int adminTeamDelete(@PathVariable(name="id") Long id) {

        return memberService.deleteMember(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "edit-teams/add")
    public Long addTeam(@RequestBody Member team) {

        return memberService.addMember(team);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "edit-teams/edit")
    public void editTeam(@RequestBody Member team) {
        memberService.updateMember(team);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-teams/type")
    public List<Type> getAllTeamTypes() {
        List<Type> types = new ArrayList<>();
        typeService.getAllTeamTypes().forEach(types::add);

        return types;
    }

    /*------------------*/
    /*--- Disciplines --*/
    /*------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-discipline")
    public List<Type> getAllDisciplines() {
        List<Type> disciplines = new ArrayList<>();
        typeService.getAllDisciplines().forEach(disciplines::add);

        return disciplines;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-discipline/{id}")
    public int deleteDiscipline(@PathVariable(name="id")Long id) {

        return typeService.deleteDiscipline(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "edit-discipline/add")
    public Long addDiscipline(@RequestBody Type type) {

        return typeService.addDiscipline(type);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "edit-discipline/edit")
    public void editDiscipline(@RequestBody Type type) {
        typeService.editDiscipline(type);
    }

    /*------------------*/
    /*----- Users ------*/
    /*------------------*/

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/edit-users")
    public List<User> showAllUsers() {
        List<User> users = new ArrayList<>();
        userService.getAllUsers().forEach(users::add);

        return users;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/edit-users/delete/{id}")
    public int deleteUser(@PathVariable("id") Long id) {

        return userService.deleteById(id);
    }

}
