package com.softsystem.Backend.Service;


import com.softsystem.Backend.Model.Type;
import com.softsystem.Backend.Repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TypeService {
    @Autowired
    private TypeRepository typeRepository;

    public TypeService(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    public List<Type> findAll() {
        return typeRepository.findAll();
    }
}
