package com.softsystem.backend.repository;

import com.softsystem.backend.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

    @Query("SELECT t FROM Type t WHERE t.discipline = :discipline")
    Type findByDiscipline(@Param("discipline") String discipline);

}
