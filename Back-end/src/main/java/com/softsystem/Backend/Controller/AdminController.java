package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
