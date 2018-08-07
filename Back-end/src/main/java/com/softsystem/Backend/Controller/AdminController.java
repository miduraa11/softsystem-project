package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Service.MemberSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController {

    @Autowired
    private MemberSevice memberSevice;

    @GetMapping(value = "/edit-teams")
    public Collection<Member> showAllTeams(){
        return memberSevice.getAllTeams();
    }
}
