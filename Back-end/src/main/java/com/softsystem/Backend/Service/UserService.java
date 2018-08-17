package com.softsystem.Backend.Service;

import com.softsystem.Backend.Model.Role;
import com.softsystem.Backend.Model.User;
import com.softsystem.Backend.Repository.RoleRepository;
import com.softsystem.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    public List<User> getAllUsers() {

        return userRepository.findAllUsers();
    }

    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    public Object emailExist(String login){
        Optional<User> users;
        users = userRepository.findByLogin(login);
        if(users.equals(Optional.empty()))
            return false;
        else
            return true;
    }

    public void addUser(String userLogin, String userFirstName, String userLastName, String userEmail, String userPassword){
        User user = new User();
        user.setLogin(userLogin);
        user.setFirstName(userFirstName);
        user.setLastName(userLastName);
        user.setEmail(userEmail);
        user.setPassword(userPassword);
        List<Role> role = roleRepository.findByName();
        user.setRoles(role);
        userRepository.save(user);
    }

}
