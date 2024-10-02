package com.example.apicodingchallenge.testrepo;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexa.apicodingchallenge.ApicodingchallengeApplication;
import com.hexa.apicodingchallenge.enums.Priority;
import com.hexa.apicodingchallenge.enums.Status;
import com.hexa.apicodingchallenge.model.Task;
import com.hexa.apicodingchallenge.repository.TaskRepository;

@SpringBootTest(classes = {ApicodingchallengeApplication.class})
public class TaskRepoJpaMethodTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void saveTest() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setDueDate(LocalDate.now());
        task.setPriority(Priority.HIGH);
        task.setStatus(Status.PENDING);

        Task savedTask = taskRepository.save(task);
        System.out.println("Saved task: " + savedTask);
    }

    @Test
    void findByIdTest() {
        Task task = taskRepository.findById(1).get();
        System.out.println("Found task: " + task);
    }

    @Test
    void findAllTasksTest() {
        List<Task> tasks = (List<Task>) taskRepository.findAll();
        for (Task task : tasks) {
            System.out.println("Task: " + task);
        }
    }

    @Test
    void updateTaskTitleTest() {
        Task task = taskRepository.findById(1).get();
        if (task != null) {
            task.setTitle("Updated Task Title");
            Task updatedTask = taskRepository.save(task);
            System.out.println("Updated task: " + updatedTask);
        } else {
            System.out.println("Task not found.");
        }
    }

    @Test
    void deleteTaskTest() {
        Task task = taskRepository.findById(2).get();
        if (task != null) {
            taskRepository.delete(task);
            System.out.println("Deleted task: " + task);
        } else {
            System.out.println("Task not found.");
        }
    }
}
