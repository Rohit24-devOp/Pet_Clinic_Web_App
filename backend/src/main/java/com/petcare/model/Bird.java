package com.petcare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "bird")
public class Bird extends Pet {
    
    @Column(name = "cage_size")
    private String cageSize;
    
    @Column(name = "daily_flying_minutes")
    private Integer dailyFlyingMinutes;
    
    public Bird() {
        this.setSpecies("BIRD");
    }

    public String getCageSize() { return cageSize; }
    public void setCageSize(String cageSize) { this.cageSize = cageSize; }
    public Integer getDailyFlyingMinutes() { return dailyFlyingMinutes; }
    public void setDailyFlyingMinutes(Integer dailyFlyingMinutes) { this.dailyFlyingMinutes = dailyFlyingMinutes; }
    
    @Override
    public String getCareInstructions() {
        return "Bird requires a cage size of " + (cageSize != null ? cageSize : "appropriate dimensions") + 
               " and " + (dailyFlyingMinutes != null ? dailyFlyingMinutes : 0) + " minutes of daily flying outside the cage.";
    }
    
    @Override
    public String getFeedingSchedule() {
        return (getCustomFeedingSchedule() != null && !getCustomFeedingSchedule().trim().isEmpty())
            ? getCustomFeedingSchedule()
            : "Provide fresh seeds/pellets and water daily. Include fresh fruits and veggies.";
    }
}
