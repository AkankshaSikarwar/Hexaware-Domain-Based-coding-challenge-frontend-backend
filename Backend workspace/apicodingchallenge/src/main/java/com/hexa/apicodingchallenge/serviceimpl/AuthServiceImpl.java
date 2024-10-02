package com.hexa.apicodingchallenge.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexa.apicodingchallenge.dto.JWTAuthResponse;
import com.hexa.apicodingchallenge.dto.LoginDto;
import com.hexa.apicodingchallenge.dto.RegisterDto;
import com.hexa.apicodingchallenge.dto.UserDto;
import com.hexa.apicodingchallenge.exception.BadRequestException;
import com.hexa.apicodingchallenge.model.User;
import com.hexa.apicodingchallenge.repository.UserRepository;
import com.hexa.apicodingchallenge.security.JwtTokenProvider;
import com.hexa.apicodingchallenge.service.AuthService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepo;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepo, PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public JWTAuthResponse login(LoginDto dto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        User user = userRepo.findByUsername(dto.getUsername()).orElseThrow(
                () -> new BadRequestException(HttpStatus.BAD_REQUEST, "User not found")
        );

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setRole(user.getRole());

        return new JWTAuthResponse(token, userDto);
    }

    @Override
    public String register(RegisterDto dto) {
        if (userRepo.existsByUsername(dto.getUsername())) {
            throw new BadRequestException(HttpStatus.BAD_REQUEST, "Username already exists");
        }


        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        userRepo.save(user);

        return "Registration Successful!";
    }
}
