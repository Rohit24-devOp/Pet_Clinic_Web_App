package com.petcare.service;

import com.petcare.model.Owner;
import com.petcare.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    public Owner registerOwner(Owner owner) {
        return ownerRepository.save(owner);
    }

    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }
    
    public Owner getOwnerById(Long id) {
        return ownerRepository.findById(id).orElse(null);
    }

    public Owner updateOwner(Long id, Owner ownerDetails) {
        Owner owner = ownerRepository.findById(id).orElse(null);
        if (owner != null) {
            owner.setName(ownerDetails.getName());
            owner.setEmail(ownerDetails.getEmail());
            owner.setPhone(ownerDetails.getPhone());
            owner.setAddress(ownerDetails.getAddress());
            owner.setGender(ownerDetails.getGender());
            return ownerRepository.save(owner);
        }
        return null;
    }

    public void deleteOwner(Long id) {
        ownerRepository.deleteById(id);
    }
}
