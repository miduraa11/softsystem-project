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
        players = memberRepository.findAll().stream()
                                    .filter(this::isPlayer)
                                    .collect(Collectors.toList());

        return players;
    }

    private boolean isPlayer(Member member) {
        return  member.getType().getDiscipline().equals("Skoki narciarskie") ||
                member.getType().getDiscipline().equals("Pływanie");
    }

    public void deleteById(long id) {
        memberRepository.deleteById(id);
    }

    public void updateMember(long id, String name, String discipline) {
        memberRepository.getOne(id).setName(name);
        Type tempType = typeRepository.findByDiscipline(discipline);
        memberRepository.getOne(id).setType(tempType);
        memberRepository.save(memberRepository.getOne(id));
    }

    public void addMember(String name, String discipline) {
        Member member = new Member();
        member.setName(name);
        Type tempType = typeRepository.findByDiscipline(discipline);
        member.setType(tempType);
        memberRepository.save(member);
    }

    public List<Member> findAll() {
        return memberRepository.findAll();
    }
}
