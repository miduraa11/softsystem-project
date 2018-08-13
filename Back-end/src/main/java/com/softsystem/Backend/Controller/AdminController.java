package com.softsystem.Backend.Controller;

import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Service.MemberService;
import com.softsystem.Backend.Service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AdminController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private TypeService typeService;

    @GetMapping(value = "/edit-players")
    public Collection<Member> showAllPlayers() {
        return memberService.getAllPlayers();
    }

    @DeleteMapping("/edit-players/{id}")
    public String deletePlayer(@PathVariable("id") long id) {
        System.out.println("Delete Player with ID = " + id + "...");
        memberService.deleteById(id);

        return "redirect:edit-players";
    }

    @PostMapping(value= "/edit-players/edit/{id}/{name}/{discipline}")
    public void updatePlayer(@PathVariable("id") long id, @PathVariable("name") String name, @PathVariable("discipline") String discipline) {
        memberService.updateMember(id, name, discipline);
    }

    @GetMapping(value = "/edit-players/types")
    public Collection<Type> showAllTypes() {
        return typeService.getAllTypes();
    }

    @PostMapping(value= "/edit-players/add/{name}/{discipline}")
    public void addPlayer(@PathVariable("name") String name, @PathVariable("discipline") String discipline) {
        memberService.addMember(name, discipline);
    }
}
