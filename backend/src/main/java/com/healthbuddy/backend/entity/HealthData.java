package com.healthbuddy.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "health_data")
@Data
@NoArgsConstructor
public class HealthData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private String date; // Using string to keep format consistent with frontend

    private int steps;
    private int calories;
    private int water;
    private double sleep;
    private String mood;
    private int exercise;
    private Integer heartRate;

    private Integer systolic;
    private Integer diastolic;

    private Integer pregnancyWeek;
    private Integer babyKicks;
}
