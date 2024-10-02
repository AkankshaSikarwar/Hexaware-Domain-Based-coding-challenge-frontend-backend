package com.hexa.apicodingchallenge.serviceimpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.apicodingchallenge.dto.TaskDto;
import com.hexa.apicodingchallenge.enums.Status;
import com.hexa.apicodingchallenge.exception.ResourceNotFoundException;
import com.hexa.apicodingchallenge.model.Task;
import com.hexa.apicodingchallenge.repository.TaskRepository;
import com.hexa.apicodingchallenge.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ModelMapper modelMapper;

    public Task addTask(TaskDto taskDto) {
    	Task taskModel = this.modelMapper.map(taskDto, Task.class);
    	
//        taskModel.setStatus(Status.PENDING);  
        return this.taskRepository.save(taskModel);
    }
    
    public Task getTaskById(int id) throws ResourceNotFoundException {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Task","id",id));
        return task;
    }
    
    public List<Task> getAllTasks() {
    	
        List<Task> taskList = this.taskRepository.findAll();
        return taskList;
    }

    public Task updateTask(int id, TaskDto updatedTaskDto) throws ResourceNotFoundException {
    	
    	Task existingTask = this.taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        
    	existingTask.setTitle(updatedTaskDto.getTitle());
        existingTask.setDescription(updatedTaskDto.getDescription());
        existingTask.setDueDate(updatedTaskDto.getDueDate());
        existingTask.setPriority(updatedTaskDto.getPriority());
        existingTask.setStatus(updatedTaskDto.getStatus());

        Task updatedTask = taskRepository.save(existingTask);
        return updatedTask;
    }

    public Task deleteTaskById(int id) throws ResourceNotFoundException {
    	Task deletedTask = this.taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "title", id));
    	this.taskRepository.deleteById(id);
        return deletedTask;
    }

}
