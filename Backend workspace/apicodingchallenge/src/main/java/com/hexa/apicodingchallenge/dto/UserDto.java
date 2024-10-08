package com.hexa.apicodingchallenge.dto;

import com.hexa.apicodingchallenge.enums.Role;

public class UserDto {
    private String username;
    private String email;
    private Role role;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	
}
