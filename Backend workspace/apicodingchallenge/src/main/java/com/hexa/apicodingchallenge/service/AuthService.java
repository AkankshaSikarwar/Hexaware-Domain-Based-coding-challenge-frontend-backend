package com.hexa.apicodingchallenge.service;

import org.springframework.stereotype.Service;

import com.hexa.apicodingchallenge.dto.JWTAuthResponse;
import com.hexa.apicodingchallenge.dto.LoginDto;
import com.hexa.apicodingchallenge.dto.RegisterDto;



@Service
public interface AuthService {

	public JWTAuthResponse login(LoginDto loginDto);
	public String register(RegisterDto registerDto);
}
