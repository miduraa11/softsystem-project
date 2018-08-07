package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class MemberSevice {

    @Autowired
    private MemberRepository memberRepository;

    public Collection <Member> getAllTeams(){
        Collection<Member> teams;
        teams = memberRepository.findAll().stream().filter(this::isTeam).collect(Collectors.toList());
        return teams;
    }

    private boolean isTeam(Member member){
        return member.getType().getDiscipline().equals("Pilka_nozna");
    }

}
