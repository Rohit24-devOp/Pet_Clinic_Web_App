package com.petcare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "dog")
public class Dog extends Pet {
    
    @Column(name = "walk_schedule")
    private String walkSchedule;
    
    @Column(name = "training_notes")
    private String trainingNotes;
    
    public Dog() {
        this.setSpecies("DOG");
    }

    public String getWalkSchedule() { return walkSchedule; }
    public void setWalkSchedule(String walkSchedule) { this.walkSchedule = walkSchedule; }
    public String getTrainingNotes() { return trainingNotes; }
    public void setTrainingNotes(String trainingNotes) { this.trainingNotes = trainingNotes; }
    
    @Override
    public String getCareInstructions() {
        return "Dog requires daily walks according to schedule: " + (walkSchedule != null ? walkSchedule : "Not set") + ". Ensure regular training.";
    }
    
    @Override
    public String getFeedingSchedule() {
        return (getCustomFeedingSchedule() != null && !getCustomFeedingSchedule().trim().isEmpty())
            ? getCustomFeedingSchedule()
            : "Feed twice a day with high quality dog food.";
    }
}
