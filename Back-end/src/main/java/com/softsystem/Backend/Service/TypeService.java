package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class TypeService {

    @Autowired
    private TypeRepository typeRepository;

    public Collection <Type> getAllTypes() {
        Collection<Type> types;
        types = typeRepository.findAll().stream()
                .filter(this::isSingle)
                .collect(Collectors.toList());

        return types;
    }

    private boolean isSingle(Type type) {
        return  type.getDiscipline().equals("Skoki narciarskie") ||
                type.getDiscipline().equals("Pływanie");
    }

//    public Type findByDiscipline(EntityManager em, String discipline) {
//        TypedQuery<Type> query = em.createQuery(
//                "SELECT t FROM Type t WHERE t.discipline = '" + discipline + "'",
//                Type.class
//        );
//        return query.getSingleResult();
//    }

}
