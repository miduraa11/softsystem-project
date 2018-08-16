package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN u.roles ur WHERE (SELECT COUNT(uo) FROM u.roles uo JOIN u.roles ur) = 1")
    List<User> findAllUsers();

}
