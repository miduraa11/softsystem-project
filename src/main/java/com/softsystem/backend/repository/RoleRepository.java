package com.softsystem.backend.repository;

import com.softsystem.backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository <Role, Long> {

    @Query("SELECT r FROM Role r WHERE r.name = 'USER'")
    List<Role> findByName();

}
