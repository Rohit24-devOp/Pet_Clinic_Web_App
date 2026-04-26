package com.petcare.controller;

import com.petcare.model.HealthRecord;
import com.petcare.model.VetAppointment;
import com.petcare.service.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HealthController {

    @Autowired
    private HealthService healthService;

    @PostMapping("/health-records")
    public ResponseEntity<HealthRecord> addHealthRecord(@RequestBody HealthRecord record) {
        return ResponseEntity.ok(healthService.addHealthRecord(record));
    }

    @GetMapping("/pets/{id}/health-records")
    public ResponseEntity<List<HealthRecord>> getHealthRecords(@PathVariable Long id) {
        return ResponseEntity.ok(healthService.getHealthRecordsByPetId(id));
    }

    @PostMapping("/appointments")
    public ResponseEntity<VetAppointment> scheduleAppointment(@RequestBody VetAppointment appointment) {
        return ResponseEntity.ok(healthService.scheduleAppointment(appointment));
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<VetAppointment>> getAllAppointments() {
        return ResponseEntity.ok(healthService.getAllAppointments());
    }
}
