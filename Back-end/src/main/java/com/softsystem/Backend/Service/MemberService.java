package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Member;
import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Repository.MemberRepository;
import com.softsystem.Backend.Repository.TypeRepository;
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
        Collection <Member> players;
        players = memberRepository.findAll()
                .stream()
                .filter(this::isPlayer)
                .collect(Collectors.toList());

        return players;
    }

    public Collection <Member> getAllTeams() {
        Collection<Member> teams;
        teams = memberRepository.findAll()
                .stream()
                .filter(this::isTeam)
                .collect(Collectors.toList());

        return teams;
    }

    public List<Member> findAll() {

        return memberRepository.findAll();
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

        return member.getType().getIndividual();
    }

    private boolean isTeam(Member member) {

        return !member.getType().getIndividual();
    }

}
