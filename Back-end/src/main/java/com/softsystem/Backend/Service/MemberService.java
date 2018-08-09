package com.softsystem.Backend.Service;

import com.softsystem.Backend.DTO.MemberDTO;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository){
        this.memberRepository=memberRepository;
    }

    public Collection <Member> getAllTeams(){
        Collection<Member> teams;
        teams = memberRepository.findAll().stream().filter(this::isTeam).collect(Collectors.toList());
        return teams;
    }

    public void addTeam(MemberDTO team){
        Member member = new Member();
        // member.setType(MemberType.Team);
        member.setName(team.getName());

        memberRepository.saveAndFlush(member);
    }

    public void deleteMember(Long id){memberRepository.deleteById(id);}

    private boolean isTeam(Member member){
        return member.getType().getDiscipline().equals("Pilka_nozna");
    }

}