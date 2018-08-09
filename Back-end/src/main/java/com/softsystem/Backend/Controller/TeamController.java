package com.softsystem.Backend.Controller;

import com.softsystem.Backend.DTO.MemberDTO;
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
    @PostMapping(path = "edit-teams/add")
    public void addTeam(@RequestBody MemberDTO team){
        memberService.addTeam(team);
    }

}
