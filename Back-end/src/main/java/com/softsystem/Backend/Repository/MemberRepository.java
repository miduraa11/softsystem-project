package com.softsystem.Backend.Repository;

import com.softsystem.Backend.Model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface MemberRepository extends JpaRepository<Member, Long> {
}
