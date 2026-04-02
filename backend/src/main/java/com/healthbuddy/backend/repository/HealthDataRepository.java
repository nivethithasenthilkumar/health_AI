package com.healthbuddy.backend.repository;

import com.healthbuddy.backend.entity.HealthData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthDataRepository extends JpaRepository<HealthData, Long> {
    List<HealthData> findByUserId(String userId);
}
