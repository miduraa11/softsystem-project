package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    @Query("SELECT b FROM Bet b JOIN b.event e WHERE e.id = :eventId")
    Bet[] allPrize(@Param("eventId")Long eventId);

    @Query("SELECT b FROM Bet b JOIN b.event e WHERE e.id = :eventId AND b.isGeneral = TRUE AND b.betResult = TRUE")
    Bet[] allIsGeneral(@Param("eventId")Long eventId);

    @Query("SELECT b FROM Bet b JOIN b.event e WHERE e.id = :eventId AND b.isGeneral = FALSE AND b.betResult = TRUE")
    Bet[] allIsNotGeneral(@Param("eventId")Long eventId);
}
