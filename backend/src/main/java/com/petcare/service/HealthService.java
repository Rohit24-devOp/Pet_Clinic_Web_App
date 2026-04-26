package com.petcare.service;

import com.petcare.exception.AppointmentConflictException;
import com.petcare.model.HealthRecord;
import com.petcare.model.VetAppointment;
import com.petcare.repository.HealthRecordRepository;
import com.petcare.repository.VetAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthService {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private VetAppointmentRepository vetAppointmentRepository;

    public HealthRecord addHealthRecord(HealthRecord record) {
        return healthRecordRepository.save(record);
    }

    public List<HealthRecord> getHealthRecordsByPetId(Long petId) {
        return healthRecordRepository.findByPetIdOrderByDateDesc(petId);
    }

    public VetAppointment scheduleAppointment(VetAppointment appointment) {
        if (vetAppointmentRepository.existsByDateTimeAndVetName(appointment.getDateTime(), appointment.getVetName())) {
            throw new AppointmentConflictException("Vet appointment time conflicts with an existing booking");
        }
        if (appointment.getStatus() == null) {
            appointment.setStatus("SCHEDULED");
        }
        return vetAppointmentRepository.save(appointment);
    }

    public List<VetAppointment> getAllAppointments() {
        return vetAppointmentRepository.findAll();
    }
}
