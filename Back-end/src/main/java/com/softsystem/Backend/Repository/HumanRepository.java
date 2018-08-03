package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.Human;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HumanRepository extends JpaRepository<Human, Long> {

}
