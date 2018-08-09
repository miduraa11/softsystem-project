package com.softsystem.Backend.Controller;

import com.softsystem.Backend.DTO.MemberDTO;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private MemberService memberService;

    @GetMapping(value = "/edit-teams")
    public Collection<Member> showAllTeams(){
        return memberService.getAllTeams();
    }
    @PostMapping(path = "/add")
    public void addTeam(@RequestBody MemberDTO team){
        memberService.addTeam(team);
    }

}
