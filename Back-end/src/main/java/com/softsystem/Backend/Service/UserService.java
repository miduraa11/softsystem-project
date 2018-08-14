package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.User;
import com.softsystem.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public void addUser(String userFirstName, String userLastName, String userEmail, String userPassword){
        User user = new User();
        user.setFirstName(userFirstName);
        user.setLastName(userLastName);
        user.setEmail(userEmail);
        user.setPassword(userPassword);
        userRepository.save(user);
    }
}
