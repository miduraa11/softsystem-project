package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.Bet;
import com.softsystem.Backend.Model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    @Query("SELECT b FROM Bet b JOIN b.user br WHERE br.id = :userId")
    Collection<Bet> findAllBetsByUserId(@Param("userId") Long userId);

}
