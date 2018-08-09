package com.softsystem.Backend.Service;

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

    public Collection <Member> getAllPlayers() {
        Collection <Member> players;
        players = memberRepository.findAll().stream()
                                    .filter(this::isPlayer)
                                    .collect(Collectors.toList());
        return players;
    }

    private boolean isPlayer(Member member) {
        return member.getType().getDiscipline().equals("Skoki_narciarskie");
    }

    public void deleteById(long id) {
        memberRepository.deleteById(id);
    }

    public void updateMember(Member member) {
        memberRepository.getOne(member.getId()).setName(member.getName());
        memberRepository.getOne(member.getId()).getType().setDiscipline(member.getType().getDiscipline());
        memberRepository.save(member);
    }
}
