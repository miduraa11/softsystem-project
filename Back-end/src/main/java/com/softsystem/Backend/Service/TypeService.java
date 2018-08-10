package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class TypeService {
    @Autowired
    TypeRepository typeRepository;

    public Collection<Type> getAllType(){
        Collection<Type> types;
        types = typeRepository.findAll().stream().collect(Collectors.toList());
        return types;
    }

}
