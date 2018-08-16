package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(
            value = "SELECT * FROM user u WHERE u.login = :login", nativeQuery = true
    )
    Optional<User> findByLogin(@Param("login") String login);
}
