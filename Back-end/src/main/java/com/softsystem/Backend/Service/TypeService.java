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

    private boolean isSingle(Type type) {

        return  type.isIndividual();
    }

    private boolean isMultiple(Type type) {

        return  !type.isIndividual();
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

    public void addDiscipline(String name, boolean individual) {
        Type discipline = new Type();
        discipline.setDiscipline(name);
        discipline.setIndividual(individual);
        typeRepository.save(discipline);
    }

    public void editDiscipline(String name, long id, boolean individual) {
        Type discipline = typeRepository.getOne(id);
        discipline.setDiscipline(name);
        discipline.setIndividual(individual);
        typeRepository.save(discipline);
    }

    public void deleteDiscipline(Long id) {
        //Type type = typeRepository.getOne(id);
        //typeRepository.delete(type);
        typeRepository.deleteById(id);
        //memberRepository.deleteAllByType(type);

        //typeRepository.deleteById(id);
    }


}
