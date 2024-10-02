package com.hexa.apicodingchallenge.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hexa.apicodingchallenge.dto.TaskDto;
import com.hexa.apicodingchallenge.exception.ResourceNotFoundException;
import com.hexa.apicodingchallenge.model.Task;

@Service
public interface TaskService {

	public Task addTask(TaskDto taskDto);

	public Task getTaskById(int id) throws ResourceNotFoundException;

	public List<Task> getAllTasks();

	public Task updateTask(int id, TaskDto updatedTaskDto) throws ResourceNotFoundException;

	public Task deleteTaskById(int id) throws ResourceNotFoundException;
}
