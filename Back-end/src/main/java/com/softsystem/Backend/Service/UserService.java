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

    public boolean authUser(String login, String password) {
        User user;
        user = userRepository.getUserByLogin(login);
        if(user == null){
            return false;
        }
        String userPassword = user.getPassword();
        if(password.equals(userPassword)){
            return true;
        } else {
            return false;
        }
    }

    public Long getUserId(String login){
        User user;
        Long userId;
        user = userRepository.getUserByLogin(login);
        userId = user.getId();
        return userId;
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

    public String getUserRole(Long userId) { return userRepository.getRoleByUser(userId);
    }
}
