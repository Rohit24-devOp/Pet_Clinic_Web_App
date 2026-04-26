package com.petcare.repository;

import com.petcare.model.VetAppointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VetAppointmentRepository extends JpaRepository<VetAppointment, Long> {
    List<VetAppointment> findByPetIdOrderByDateTimeAsc(Long petId);
    List<VetAppointment> findByDateTimeBetweenOrderByDateTimeAsc(LocalDateTime start, LocalDateTime end);
    boolean existsByDateTimeAndVetName(LocalDateTime dateTime, String vetName);
}
