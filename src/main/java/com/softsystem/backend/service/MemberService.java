package com.softsystem.backend.service;

import com.softsystem.backend.model.Member;
import com.softsystem.backend.repository.MemberRepository;
import com.softsystem.backend.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.stream.Collectors;
import java.util.List;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TypeRepository typeRepository;

    public Collection <Member> getAllPlayers() {

        return memberRepository.findAll()
                .stream()
                .filter(this::isPlayer)
                .collect(Collectors.toList());
    }

    public Collection <Member> getAllTeams() {

        return memberRepository.findAll()
                .stream()
                .filter(this::isTeam)
                .collect(Collectors.toList());
    }

    public List<Member> findAll() {

        return memberRepository.findAll()
                .stream()
                .filter(x -> x.getId() != -1)
                .collect(Collectors.toList());
    }

    public int deleteMember(Long id) {
        try {
            memberRepository.deleteById(id);

            return 0;
        } catch (Exception e) {

            return -1;
        }
    }

    public void updateMember(Member member) {
        memberRepository.getOne(member.getId()).setName(member.getName());
        memberRepository.getOne(member.getId()).setType(member.getType());
        memberRepository.save(memberRepository.getOne(member.getId()));
    }

    public Long addMember(Member member) {
        Member newMember = new Member();
        newMember.setName(member.getName());
        newMember.setType(member.getType());
        memberRepository.save(newMember);

        return newMember.getId();
    }

    private boolean isPlayer(Member member) {
        if(member.getType() == null) { return false; }
        else { return member.getType().getIndividual(); }
    }

    private boolean isTeam(Member member) {
        if(member.getType() == null) { return false; }
        else { return !member.getType().getIndividual(); }
    }

}
