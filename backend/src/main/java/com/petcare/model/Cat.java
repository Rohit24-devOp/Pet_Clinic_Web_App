package com.petcare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "cat")
public class Cat extends Pet {
    
    @Column(name = "is_indoor")
    private Boolean isIndoor;
    
    @Column(name = "grooming_schedule")
    private String groomingSchedule;
    
    public Cat() {
        this.setSpecies("CAT");
    }

    public Boolean getIsIndoor() { return isIndoor; }
    public void setIsIndoor(Boolean isIndoor) { this.isIndoor = isIndoor; }
    public String getGroomingSchedule() { return groomingSchedule; }
    public void setGroomingSchedule(String groomingSchedule) { this.groomingSchedule = groomingSchedule; }
    
    @Override
    public String getCareInstructions() {
        String environment = (isIndoor != null && isIndoor) ? "Keep indoors." : "Allowed outdoors but monitor safely.";
        return "Cat care: " + environment + " Grooming required: " + (groomingSchedule != null ? groomingSchedule : "Regularly") + ".";
    }
    
    @Override
    public String getFeedingSchedule() {
        return (getCustomFeedingSchedule() != null && !getCustomFeedingSchedule().trim().isEmpty())
            ? getCustomFeedingSchedule()
            : "Free feed dry food, wet food once a day.";
    }
}
