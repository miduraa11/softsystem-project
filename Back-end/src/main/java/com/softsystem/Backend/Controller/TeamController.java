package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TeamController {

    @Autowired
    MemberService memberService;

    @GetMapping("/edit-teams")
    public List<Member> getAllTeam() {
        List<Member> teams = new ArrayList<>();
        memberService.getAllTeams().forEach(teams::add);

        return teams;
    }

    @DeleteMapping("/edit-teams/{id}")
    public String adminTeamDelete(@PathVariable(name="id")Long id) {
        memberService.deleteMember(id);
        return "redirect:edit-teams";
    }
    @PostMapping(path = "edit-teams/add/{name}/{idType}")
    public void addTeam(@PathVariable("name")String name, @PathVariable("idType")Long idType){
        memberService.addTeam(name, idType);
    }

    @PostMapping(path = "edit-teams/edit/{id}/{name}/{idType}")
    public void editTeam(@PathVariable("id")long id, @PathVariable("name")String name, @PathVariable("idType")long idType){
        memberService.editMember(name, id, idType);
    }

}