package com.softsystem.backend.service;

import com.softsystem.backend.DTO.AccountActivationDTO;
import com.softsystem.backend.DTO.ChangePasswordDTO;
import com.softsystem.backend.model.Bet;
import com.softsystem.backend.model.Role;
import com.softsystem.backend.model.User;
import com.softsystem.backend.repository.RoleRepository;
import com.softsystem.backend.repository.BetRepository;
import com.softsystem.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service(value = "userService")
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    BetRepository betRepository;
    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }


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

    public Boolean authUser(String username, String password) {
        User user;
        user = userRepository.getUserByUsername(username);
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

    public Long getUserId(String username) {
        User user;
        Long userId;
        user = userRepository.getUserByUsername(username);
        userId = user.getId();

        return userId;
    }

    public boolean emailExist(String username){
        User users;
        users = userRepository.findByUsername(username);
        if(users == null)
            return false;
        else
            return true;
    }

    public void addUser(User user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setActivated(false);
        List<Role> role = roleRepository.findByName();
        newUser.setRoles(role);
        userRepository.save(newUser);
    }

    public String getUserRole(Long userId) {

        return userRepository.getRoleByUser(userId);
    }

    public User getUserById(Long id) {
        User user = userRepository.findUserById(id);
        user.setPassword("");

        return user;
    }

    public Object changePassword(ChangePasswordDTO changePassword) {
        User user = userRepository.findUserById(changePassword.getId());
        if (bcryptEncoder.matches(changePassword.getCurrentPassword(), user.getPassword())) {
            user.setPassword(bcryptEncoder.encode(changePassword.getPassword()));
            userRepository.save(user);

            return true;
        }
        else return false;
    }

    public boolean checkSecretPassword(AccountActivationDTO accountActivation) {
        User user = userRepository.findUserById(accountActivation.getId());
        User adminPassword = userRepository.findUserById((long) 1);
        String hashSecretPassword = adminPassword.getActivationPassword();
        String password = accountActivation.getSecretPassword();
        if(bcryptEncoder.matches(password, hashSecretPassword)) {
            user.setActivated(true);
            userRepository.save(user);

            return true;
        } else return false;

    }

    public void changeActivationPassword(String currentActivationPassword) {
        List<User> allUsers = userRepository.findAllUsers();
        User admin = userRepository.findUserById((long) 1);
        String newPassword = currentActivationPassword;
        admin.setActivationPassword(bcryptEncoder.encode(newPassword));
        userRepository.save(admin);
        allUsers.forEach(x -> x.setActivated(false));
        userRepository.saveAll(allUsers);
    }

    public Object getAccount(Long id) {
        double account[] = new double[7];
        Bet bets[] = betRepository.getAllByUser(id);
        for (Bet bet: bets) {
            if(bet.getBetResult()==null) {
                account[3] = account[3] + bet.getAmount();
                account[6]=account[6]+1;
                continue;
            }
            if(bet.getBetResult()==false) {
                if(bet.getPrize()==0.0)
                    account[1] = account[1] + bet.getAmount();
                account[5]=account[5]+1;
                continue;
            }
            if(bet.getBetResult()==true){
                account[0]=account[0]+bet.getPrize()-bet.getAmount();
                account[4]=account[4]+1;
                continue;
            }
        }
        account[2]=account[0]-account[1];
        account[1]=-account[1];

        return account;
    }

    public Object getHistory(Long id){
        Bet bets[] = betRepository.getFinishByUser(id);
        double history[][] = new double[bets.length+1][2];
        history[0][0]=0;
        history[0][1]=0;
        for (int i=1;i<bets.length+1 && i<21;i++){
            if(bets[i-1].getPrize()>0.0)
                history[i][0]=bets[i-1].getPrize()-bets[i-1].getAmount();
            if(bets[i-1].getPrize()==0.0)
                history[i][0]=-bets[i-1].getAmount();
            history[0][0]=i;
        }
        for (int i=1, j=(int)history[0][0];i<bets.length+1 && i<(int)history[0][0]+1;i++,j--){
            if(i>1)
                history[j][1]=history[j+1][1]+history[j][0];
            else
                history[j][1]=history[j][0];
        }
        return history;
    }


}
