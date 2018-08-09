package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController {

    @Autowired
    private MemberService memberService;

    @GetMapping(value = "/edit-players")
    public Collection<Member> showAllPlayers () {
        return memberService.getAllPlayers();
    }

    @DeleteMapping("/edit-players/{id}")
    public String deletePlayer(@PathVariable("id") long id) {
        System.out.println("Delete Player with ID = " + id + "...");
        memberService.deleteById(id);

        return "redirect:edit-players";
    }

    @PostMapping(value= "/edit-players/edit/{id}")
    public String updatePlayer(@RequestBody Member member) {
        memberService.updateMember(member);

        return "redirect:edit-players";
    }
}
