package com.petcare.service;

import com.petcare.exception.AlreadyFeedException;
import com.petcare.exception.PetNotFoundException;
import com.petcare.model.HealthRecord;
import com.petcare.model.Pet;
import com.petcare.model.VetAppointment;
import com.petcare.repository.HealthRecordRepository;
import com.petcare.repository.PetRepository;
import com.petcare.repository.VetAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private HealthRecordRepository healthRecordRepository;
    
    @Autowired
    private VetAppointmentRepository vetAppointmentRepository;

    public Pet addPet(Pet pet) {
        return petRepository.save(pet);
    }

    public List<Pet> getPetsByOwnerId(Long ownerId) {
        return petRepository.findByOwner_Id(ownerId);
    }

    public Pet getPetById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new PetNotFoundException("Pet with ID " + id + " not found"));
    }

    public void removePet(Long id) {
        Pet pet = getPetById(id);
        petRepository.delete(pet);
    }

    public Pet feedPet(Long id) {
        Pet pet = getPetById(id);
        if (pet.getLastFedAt() != null && pet.getLastFedAt().toLocalDate().isEqual(LocalDate.now())) {
            throw new AlreadyFeedException("Pet has already been fed today");
        }
        pet.setLastFedAt(LocalDateTime.now());
        return petRepository.save(pet);
    }

    public Pet updateFeedingSchedule(Long id, String customSchedule) {
        Pet pet = getPetById(id);
        pet.setCustomFeedingSchedule(customSchedule);
        return petRepository.save(pet);
    }

    public List<Pet> getFeedingReminders() {
        return petRepository.findAll().stream()
                .filter(pet -> pet.getLastFedAt() == null || !pet.getLastFedAt().toLocalDate().isEqual(LocalDate.now()))
                .collect(Collectors.toList());
    }
    
    public Map<String, Object> getPetDetailsWithStatus(Long id) {
        Pet pet = getPetById(id);
        Map<String, Object> details = new HashMap<>();
        details.put("pet", pet);
        details.put("careInstructions", pet.getCareInstructions());
        details.put("feedingSchedule", pet.getFeedingSchedule());
        details.put("healthStatus", calculateHealthStatus(pet));
        return details;
    }
    
    public String calculateHealthStatus(Pet pet) {
        boolean notFedToday = pet.getLastFedAt() == null || !pet.getLastFedAt().toLocalDate().isEqual(LocalDate.now());
        
        List<HealthRecord> vaccinations = healthRecordRepository.findByPetIdAndTypeOrderByDateDesc(pet.getId(), "VACCINATION");
        boolean vaxOverdueLess30 = false;
        boolean vaxOverdueMore30 = false;
        
        for (HealthRecord rec : vaccinations) {
            if (rec.getNextDueDate() != null && rec.getNextDueDate().isBefore(LocalDate.now())) {
                long daysOverdue = ChronoUnit.DAYS.between(rec.getNextDueDate(), LocalDate.now());
                if (daysOverdue > 30) {
                    vaxOverdueMore30 = true;
                } else {
                    vaxOverdueLess30 = true;
                }
            }
        }
        
        List<VetAppointment> appointments = vetAppointmentRepository.findByPetIdOrderByDateTimeAsc(pet.getId());
        boolean missedVetAppointment = appointments.stream()
                .anyMatch(app -> "SCHEDULED".equals(app.getStatus()) && app.getDateTime().isBefore(LocalDateTime.now()));
                
        if (vaxOverdueMore30 || missedVetAppointment) {
            return "CRITICAL";
        } else if (notFedToday || vaxOverdueLess30) {
            return "NEEDS_ATTENTION";
        }
        return "HEALTHY";
    }
    
    public List<Map<String, Object>> getAllPetsWithStatus() {
        return petRepository.findAll().stream().map(pet -> {
            Map<String, Object> map = new HashMap<>();
            map.put("pet", pet);
            map.put("healthStatus", calculateHealthStatus(pet));
            return map;
        }).collect(Collectors.toList());
    }
}
