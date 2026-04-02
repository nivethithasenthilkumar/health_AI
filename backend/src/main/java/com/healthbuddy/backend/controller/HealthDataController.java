package com.healthbuddy.backend.controller;

import com.healthbuddy.backend.entity.HealthData;
import com.healthbuddy.backend.repository.HealthDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-data")
@CrossOrigin(origins = "*")
public class HealthDataController {

    @Autowired
    private HealthDataRepository healthDataRepository;

    @PostMapping
    public ResponseEntity<HealthData> addHealthData(@RequestBody HealthData healthData) {
        HealthData savedData = healthDataRepository.save(healthData);
        return ResponseEntity.ok(savedData);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<HealthData>> getUserHealthData(@PathVariable String userId) {
        List<HealthData> data = healthDataRepository.findByUserId(userId);
        return ResponseEntity.ok(data);
    }
}
