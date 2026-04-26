package com.petcare.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "pets")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "species", visible = true)
@JsonSubTypes({
    @JsonSubTypes.Type(value = Dog.class, name = "DOG"),
    @JsonSubTypes.Type(value = Cat.class, name = "CAT"),
    @JsonSubTypes.Type(value = Bird.class, name = "BIRD")
})
public abstract class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Integer age;
    private String breed;
    private String species;
    
    @Column(name = "last_fed_at")
    private LocalDateTime lastFedAt;
    
    @Column(name = "custom_feeding_schedule")
    private String customFeedingSchedule;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private Owner owner;

    public Pet() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public LocalDateTime getLastFedAt() { return lastFedAt; }
    public void setLastFedAt(LocalDateTime lastFedAt) { this.lastFedAt = lastFedAt; }
    public Owner getOwner() { return owner; }
    public void setOwner(Owner owner) { this.owner = owner; }
    public String getCustomFeedingSchedule() { return customFeedingSchedule; }
    public void setCustomFeedingSchedule(String customFeedingSchedule) { this.customFeedingSchedule = customFeedingSchedule; }
    
    @Transient
    public Long getOwnerId() {
        return owner != null ? owner.getId() : null;
    }
    
    public abstract String getCareInstructions();
    public abstract String getFeedingSchedule();
}
