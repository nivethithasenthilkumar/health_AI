package com.healthbuddy.backend.controller;

import com.healthbuddy.backend.entity.HealthData;
import com.healthbuddy.backend.repository.HealthDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/predictions")
@CrossOrigin(origins = "*")
public class PredictionsController {

    @Autowired
    private HealthDataRepository healthDataRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getPredictions(@PathVariable String userId) {
        List<HealthData> data = healthDataRepository.findByUserId(userId);
        // Sort by date descending
        data.sort((a, b) -> b.getDate().compareTo(a.getDate()));
        
        List<HealthData> recentData = data.size() > 7 ? data.subList(0, 7) : data;

        int healthScore = 75;
        List<String> recommendations = new ArrayList<>();
        List<Map<String, Object>> trends = new ArrayList<>();

        if (!recentData.isEmpty()) {
            double avgSteps = recentData.stream().mapToInt(HealthData::getSteps).average().orElse(0);
            double avgSleep = recentData.stream().mapToDouble(HealthData::getSleep).average().orElse(0);
            double avgWater = recentData.stream().mapToInt(HealthData::getWater).average().orElse(0);
            double avgExercise = recentData.stream().mapToInt(HealthData::getExercise).average().orElse(0);

            if (avgSteps >= 8000) healthScore += 10;
            else if (avgSteps < 5000) {
                healthScore -= 5;
                recommendations.add("Try to increase your daily steps to at least 8,000");
            }

            if (avgSleep >= 7) healthScore += 10;
            else if (avgSleep < 6) {
                healthScore -= 10;
                recommendations.add("Aim for 7-8 hours of sleep each night");
            }

            if (avgWater >= 8) healthScore += 5;
            else {
                recommendations.add("Drink at least 8 glasses of water daily");
            }

            if (avgExercise >= 30) healthScore += 10;
            else {
                recommendations.add("Try to exercise for at least 30 minutes daily");
            }

            if (recentData.size() >= 2) {
                int mid = recentData.size() / 2;
                List<HealthData> firstHalf = recentData.subList(0, mid);
                List<HealthData> secondHalf = recentData.subList(mid, recentData.size());

                double avgStepsFirst = firstHalf.stream().mapToInt(HealthData::getSteps).average().orElse(0);
                double avgStepsSecond = secondHalf.stream().mapToInt(HealthData::getSteps).average().orElse(0);
                
                Map<String, Object> stepTrend = new HashMap<>();
                stepTrend.put("metric", "Steps");
                stepTrend.put("trend", avgStepsSecond > avgStepsFirst * 1.1 ? "up" : (avgStepsSecond < avgStepsFirst * 0.9 ? "down" : "stable"));
                trends.add(stepTrend);
            }
        } else {
            recommendations.add("Start tracking your health data to get personalized recommendations!");
        }

        healthScore = Math.min(100, Math.max(0, healthScore));

        Map<String, Object> response = new HashMap<>();
        response.put("healthScore", healthScore);
        response.put("riskLevel", healthScore >= 80 ? "low" : (healthScore >= 60 ? "medium" : "high"));
        response.put("recommendations", recommendations);
        response.put("trends", trends);

        return ResponseEntity.ok(response);
    }
}
