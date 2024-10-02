package com.hexa.apicodingchallenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexa.apicodingchallenge.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}