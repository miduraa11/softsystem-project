package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Repository.MemberRepository;
import com.softsystem.Backend.Repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private MemberRepository memberRepository;

    public Collection <Type> getAllIndividualTypes() {
        Collection<Type> types;
        types = typeRepository.findAll().stream()
                .filter(this::isSingle)
                .collect(Collectors.toList());

        return types;
    }

    private Boolean isSingle(Type type) {

        return  type.getIndividual();
    }

    private Boolean isMultiple(Type type) {

        return  !type.getIndividual();
    }

    public List<Type> findAll() {

        return typeRepository.findAll();
    }

    public Collection<Type> getAllTeamTypes() {
        Collection<Type> types;
        types = typeRepository.findAll().stream()
                .filter(this::isMultiple)
                .collect(Collectors.toList());

        return types;
    }

    public Collection <Type> getAllDisciplines() {
        Collection<Type> disciplines;
        disciplines = typeRepository.findAll();
        return disciplines;
    }

    public Long addDiscipline(Type type) {
        Type newDiscipline = new Type();
        newDiscipline.setDiscipline(type.getDiscipline());
        newDiscipline.setIndividual(type.getIndividual());
        typeRepository.save(newDiscipline);

        return newDiscipline.getId();
    }

    public void editDiscipline(Type type) {
        Type discipline = typeRepository.getOne(type.getId());
        discipline.setDiscipline(type.getDiscipline());
        discipline.setIndividual(type.getIndividual());
        typeRepository.save(discipline);
    }

    public int deleteDiscipline(Long id) {
        try {
            typeRepository.deleteById(id);
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }

}
