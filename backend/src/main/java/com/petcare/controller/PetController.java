package com.petcare.controller;

import com.petcare.model.Pet;
import com.petcare.service.OwnerService;
import com.petcare.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PetController {

    @Autowired
    private PetService petService;
    
    @Autowired
    private OwnerService ownerService;

    @PostMapping("/pets")
    public ResponseEntity<Pet> addPet(@RequestBody Pet pet) {
        // Assume ownerId is passed within pet object or handled appropriately
        if (pet.getOwnerId() != null) {
            pet.setOwner(ownerService.getOwnerById(pet.getOwnerId()));
        }
        return ResponseEntity.ok(petService.addPet(pet));
    }

    @GetMapping("/owners/{ownerId}/pets")
    public ResponseEntity<List<Pet>> getPetsByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(petService.getPetsByOwnerId(ownerId));
    }
    
    @GetMapping("/pets")
    public ResponseEntity<List<Map<String, Object>>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPetsWithStatus());
    }

    @GetMapping("/pets/{id}")
    public ResponseEntity<Map<String, Object>> getPetDetails(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getPetDetailsWithStatus(id));
    }

    @DeleteMapping("/pets/{id}")
    public ResponseEntity<Void> removePet(@PathVariable Long id) {
        petService.removePet(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/pets/{id}/feed")
    public ResponseEntity<Pet> feedPet(@PathVariable Long id) {
        return ResponseEntity.ok(petService.feedPet(id));
    }

    @PutMapping("/pets/{id}/feeding-schedule")
    public ResponseEntity<Pet> updateFeedingSchedule(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(petService.updateFeedingSchedule(id, payload.get("schedule")));
    }

    @GetMapping("/pets/feeding-reminders")
    public ResponseEntity<List<Pet>> getFeedingReminders() {
        return ResponseEntity.ok(petService.getFeedingReminders());
    }
}
