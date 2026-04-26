package com.petcare.repository;

import com.petcare.model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    List<HealthRecord> findByPetIdOrderByDateDesc(Long petId);
    List<HealthRecord> findByPetIdAndTypeOrderByDateDesc(Long petId, String type);
}
