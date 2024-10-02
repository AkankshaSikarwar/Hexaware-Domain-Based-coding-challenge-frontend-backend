package com.hexa.apicodingchallenge;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.hexa.apicodingchallenge.dto.RegisterDto;
import com.hexa.apicodingchallenge.enums.Role;
import com.hexa.apicodingchallenge.service.AuthService;

@SpringBootApplication
public class ApicodingchallengeApplication implements CommandLineRunner {

	
	@Autowired
	private AuthService authService;
	
	public static void main(String[] args) {
		SpringApplication.run(ApicodingchallengeApplication.class, args);
	}
	
	@Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		RegisterDto admin = new RegisterDto();

		admin.setUsername("of123");
		admin.setPassword("of123");
		admin.setRole(Role.ADMIN);
        
//        authService.register(admin); // Save the officer
	}

}
