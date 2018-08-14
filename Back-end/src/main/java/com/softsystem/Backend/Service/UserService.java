package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.User;
import com.softsystem.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers() {

        return userRepository.findAllUsers();
    }

    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

}
