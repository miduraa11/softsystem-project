package com.softsystem.Backend.Service;

import com.softsystem.Backend.DTO.UserListDTO;
import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Model.Role;
import com.softsystem.Backend.Model.User;
import com.softsystem.Backend.Repository.RoleRepository;
import com.softsystem.Backend.Repository.BetRepository;
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
    @Autowired
    BetRepository betRepository;

    public List<User> getAllUsers() {

        return userRepository.findAllUsers();
    }

    public int deleteById(Long id) {
        try {
            userRepository.deleteById(id);
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }

    public Boolean authUser(String login, String password) {
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

    public String getUserRole(Long userId) { return userRepository.getRoleByUser(userId); }

    public User getUserById(Long id){
        User user = userRepository.findByIdUser(id);
        user.setPassword("");
        return user;
    }

    public Object changePassword(Long id, String currentPassword, String password){
        User user = userRepository.getOne(id);
        if (user.getPassword().equals(currentPassword)) {
            user.setPassword(password);
            userRepository.save(user);
            return true;
        }
        else return false;
    }

    public Object getAccount(Long id){
        double account[] = {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0};
        Bet bets[] = betRepository.getAllByUser(id);
        for (Bet bet: bets) {
            if(bet.getBetResult()==null) {
                account[3] = account[3] + bet.getAmount();
                account[6]=account[6]+1;
                continue;
            }
            if(bet.getPrize()==0.0) {
                account[1] = account[1] + bet.getAmount();
                account[5]=account[5]+1;
                continue;
            }
            if(bet.getPrize()>0.0){
                account[0]=account[0]+bet.getPrize();
                account[4]=account[4]+1;
                continue;
            }
        }
        account[2]=account[0]-account[1];
        account[1]=-account[1];
        return account;
    }
}
