package com.petcare;

import com.petcare.model.*;
import com.petcare.repository.OwnerRepository;
import com.petcare.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private PetRepository petRepository;

    @Override
    public void run(String... args) throws Exception {
        if (ownerRepository.count() == 0) {
            Owner owner = new Owner();
            owner.setName("John Doe");
            owner.setEmail("john.doe@example.com");
            owner.setPhone("123-456-7890");
            owner.setAddress("123 Pet Lane, City");
            owner = ownerRepository.save(owner);

            Dog dog = new Dog();
            dog.setName("Buddy");
            dog.setAge(3);
            dog.setBreed("Golden Retriever");
            dog.setOwner(owner);
            dog.setWalkSchedule("Morning and Evening");
            dog.setTrainingNotes("Knows sit and stay.");
            petRepository.save(dog);

            Cat cat = new Cat();
            cat.setName("Whiskers");
            cat.setAge(2);
            cat.setBreed("Siamese");
            cat.setOwner(owner);
            cat.setIsIndoor(true);
            cat.setGroomingSchedule("Weekly brushing");
            petRepository.save(cat);

            Bird bird = new Bird();
            bird.setName("Tweety");
            bird.setAge(1);
            bird.setBreed("Canary");
            bird.setOwner(owner);
            bird.setCageSize("Medium");
            bird.setDailyFlyingMinutes(30);
            bird.setLastFedAt(LocalDateTime.now().minusDays(1)); // Make one needs attention
            petRepository.save(bird);
            
            System.out.println("Sample data seeded into database.");
        }
    }
}
