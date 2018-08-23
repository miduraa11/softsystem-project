package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BetRepository extends JpaRepository<Bet, Long> {

    @Query("SELECT b FROM Bet b JOIN b.user br WHERE br.id = :userId")
    List<Bet> findAllBetsByUserId(@Param("userId") Long userId);

    @Query("SELECT b FROM Bet b JOIN b.event e WHERE e.id = :eventId")
    Bet[] allPrize(@Param("eventId")Long eventId);

    @Query("SELECT b FROM Bet b JOIN b.event e WHERE e.id = :eventId AND b.isGeneral = TRUE AND b.betResult = TRUE")
    Bet[] getAllIsGeneral(@Param("eventId")Long eventId);

    @Query("SELECT b FROM Bet b JOIN b.event e WHERE e.id = :eventId AND b.isGeneral = FALSE AND b.betResult = TRUE")
    Bet[] getAllIsNotGeneral(@Param("eventId")Long eventId);

    @Query("SELECT b FROM Bet b JOIN b.event e WHERE e.id = :eventId")
    Bet[] getAllByEvent(@Param("eventId")Long eventId);

    @Query("SELECT b FROM Bet b JOIN b.user u WHERE u.id = :userId")
    Bet[] getAllByUser(@Param("userId")Long userId);
}
