package com.softsystem.Backend.Controller;

import com.softsystem.Backend.DTO.EventDataDTO;
import com.softsystem.Backend.DTO.UserListDTO;
import com.softsystem.Backend.Model.*;
import com.softsystem.Backend.Service.*;
import com.softsystem.Backend.DTO.EditEventsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Arrays;
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
    @Autowired
    BetService betService;

    /*------------------*/
    /*----- Events -----*/
    /*------------------*/

    @GetMapping("/edit-events")
    public List<Event> getAllEvents() {
        List<Event> events = new ArrayList<>();
        eventService.findAll().forEach(events::add);

        return events;
    }

    @GetMapping("/edit-events/info")
    public EditEventsDTO getTypesAndMembers() {
        List<Member> members = new ArrayList<>();
        List<Type> types = new ArrayList<>();
        memberService.findAll().forEach(members::add);
        typeService.findAll().forEach(types::add);
        EditEventsDTO editEventsDTO = new EditEventsDTO(members, types);

        return editEventsDTO;
    }

    @GetMapping("/edit-events/{id}")
    public int adminEventDelete(@PathVariable(name="id")Long id) {

        return eventService.deleteEvent(id);
    }

    @GetMapping(value= "/edit-events/{id}}")
    public Event adminUserEdit(@PathVariable Long id) {
        Event event = eventService.getOne(id);

        return event;
    }


    @PostMapping(value= "/edit-events/edit")
    public void updateEvent(@RequestBody EventDataDTO eventDataDTO) {
        eventService.updateEvent(eventDataDTO.getEvent(), eventDataDTO.getTypes().get(0), eventDataDTO.getMembers());

    }

    @PostMapping(value= "/edit-events/add")
    public void addEvent(@RequestBody EventDataDTO eventDataDTO) {
        eventService.addEvent(eventDataDTO.getEvent(), eventDataDTO.getTypes().get(0), eventDataDTO.getMembers());
    }

    @PostMapping(value = "/edit-events/resolve")
    public void resolveEvent(@RequestBody Event event) {
        eventService.resolve(event);
        betService.resolveBets(event);
    }

    @GetMapping("/edit-events/userList/{eventId}")
    public List<UserListDTO> getUserList(@PathVariable(name="eventId")Long eventId) {
        List<Bet> bet;
        bet = Arrays.asList(betService.getAllBetsByEventId(eventId));

        return eventService.getAllWinners(bet);
    }

    /*-------------------*/
    /*----- Players -----*/
    /*-------------------*/

    @GetMapping(value = "/edit-players")
    public Collection<Member> showAllPlayers() {

        return memberService.getAllPlayers();
    }

    @GetMapping("/edit-players/{id}")
    public int deletePlayer(@PathVariable("id") Long id) {

        return memberService.deleteById(id);
    }

    @PostMapping(value= "/edit-players/edit/{id}/{name}/{discipline}")
    public void updatePlayer(@PathVariable("id") Long id, @PathVariable("name") String name, @PathVariable("discipline") String discipline) {
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

    @GetMapping("/edit-teams/{id}")
    public int adminTeamDelete(@PathVariable(name="id") Long id) {

        return memberService.deleteMember(id);
    }

    @PostMapping(value = "edit-teams/add/{name}/{idType}")
    public void addTeam(@PathVariable("name") String name, @PathVariable("idType") Long idType) {
        memberService.addTeam(name, idType);
    }

    @PostMapping(value = "edit-teams/edit/{id}/{name}/{discipline}")
    public void editTeam(@PathVariable("id") Long id, @PathVariable("name")String name, @PathVariable("discipline") String discipline) {
        memberService.updateMember(id, name, discipline);
    }

    @GetMapping("/edit-teams/type")
    public List<Type> getAllTeamTypes() {
        List<Type> types = new ArrayList<>();
        typeService.getAllTeamTypes().forEach(types::add);
        return types;
    }

    /*------------------*/
    /*--- Disciplines --*/
    /*------------------*/

    @GetMapping("/edit-discipline")
    public List<Type> getAllDiscipline() {
        List<Type> disciplines = new ArrayList<>();
        typeService.getAllDisciplines().forEach(disciplines::add);
        return disciplines;
    }

    @GetMapping("/edit-discipline/{id}")
    public int adminDisciplineDelete(@PathVariable(name="id")Long id) {

        return typeService.deleteDiscipline(id);
    }

    @PostMapping(value = "edit-discipline/add/{discipline}/{individual}")
    public void addDiscipline(@PathVariable("discipline") String discipline, @PathVariable("individual") boolean individual) {
        typeService.addDiscipline(discipline, individual);
    }

    @PostMapping(value = "edit-discipline/edit/{id}/{discipline}/{individual}")
    public void editDiscipline(@PathVariable("id")long id, @PathVariable("discipline")String discipline, @PathVariable("individual") boolean individual) {
        typeService.editDiscipline(discipline, id, individual);
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

    @GetMapping("/edit-users/delete/{id}")
    public int deleteUser(@PathVariable("id") Long id) {

        return userService.deleteById(id);
    }

}
