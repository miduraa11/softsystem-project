package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN u.roles ur WHERE (SELECT COUNT(uo) FROM u.roles uo JOIN u.roles ur) = 1")
    List<User> findAllUsers();


    @Query(value = "SELECT * FROM user u WHERE u.login = :login", nativeQuery = true)
    Optional<User> findByLogin(@Param("login") String login);

    User getUserByLogin(String login);

    @Query("SELECT r.name FROM User u JOIN u.roles r WHERE u.id = :userId AND NOT r.name='user'")
    String getRoleByUser(@Param("userId")Long userId);
}
