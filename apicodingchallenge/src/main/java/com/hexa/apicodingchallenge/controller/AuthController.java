package com.hexa.apicodingchallenge.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexa.apicodingchallenge.dto.JWTAuthResponse;
import com.hexa.apicodingchallenge.dto.LoginDto;
import com.hexa.apicodingchallenge.dto.RegisterDto;
import com.hexa.apicodingchallenge.enums.Role;
import com.hexa.apicodingchallenge.service.AuthService;


@RestController
@RequestMapping("/api/authenticate")
@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = { "/login", "/signin" })
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto dto) {
        JWTAuthResponse response = authService.login(dto);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = { "/register", "/signup" })
    public ResponseEntity<String> register(@RequestBody RegisterDto dto) {
    	dto.setRole(Role.USER);
        String value = authService.register(dto);
        
        return new ResponseEntity<>(value, HttpStatus.CREATED);
    }
}
