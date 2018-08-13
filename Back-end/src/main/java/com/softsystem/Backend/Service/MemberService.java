package com.softsystem.Backend.Service;

import com.softsystem.Backend.DTO.MemberDTO;
import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Repository.MemberRepository;
import com.softsystem.Backend.Repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TypeRepository typeRepository;

    public MemberService(MemberRepository memberRepository){
        this.memberRepository=memberRepository;
    }

    public Collection <Member> getAllTeams(){
        Collection<Member> teams;
        teams = memberRepository.findAll().stream().filter(this::isTeam).collect(Collectors.toList());
        return teams;
    }

    public void addTeam(String name, Long idType){
        Member member = new Member();
        Type type = typeRepository.getOne(idType);
        member.setName(name);
        member.setType(type);

        memberRepository.saveAndFlush(member);
    }

    public void editMember(String name, long id, long idType){
        Member member = memberRepository.getOne(id);
        member.setName(name);
        Type type = typeRepository.getOne(idType);
        member.setType(type);
        memberRepository.save(member);
    }

    public void deleteMember(Long id){
        memberRepository.deleteById(id);
    }

    private boolean isTeam(Member member){
        if (member.getType()!=null)
            return member.getType().getId().equals((long)1) ||
                    member.getType().getId().equals((long)3);
        else return true;
    }
}
