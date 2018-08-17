package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository <Role, Long> {

    @Query("SELECT r FROM Role r WHERE r.name = 'user'")
    List<Role> findByName();

}
