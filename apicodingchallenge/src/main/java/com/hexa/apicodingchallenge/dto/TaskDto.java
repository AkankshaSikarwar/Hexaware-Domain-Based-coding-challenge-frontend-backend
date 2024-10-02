package com.hexa.apicodingchallenge.dto;

import java.time.LocalDate;

import com.hexa.apicodingchallenge.enums.Priority;
import com.hexa.apicodingchallenge.enums.Status;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TaskDto {
	
	private int id;
	
	@NotBlank(message = "Title cannot be empty")
    @Size(min = 3, max = 50, message = "Title must be between 10 and 50 characters")
    private String title;

    @NotBlank(message = "Description cannot be empty")
    @Size(min = 3, max = 500, message = "Description must be between 10 and 500 characters")
    private String description;

    @NotNull(message = "Due date cannot be null")
    @FutureOrPresent(message = "Due date must be in the present or future")
    private LocalDate dueDate;

    private Priority priority;
    private Status status;
    
    
    
	public TaskDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public TaskDto(int id,String title, String description, LocalDate dueDate, Priority priority, Status status) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.status = status;
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	
    
    
}
