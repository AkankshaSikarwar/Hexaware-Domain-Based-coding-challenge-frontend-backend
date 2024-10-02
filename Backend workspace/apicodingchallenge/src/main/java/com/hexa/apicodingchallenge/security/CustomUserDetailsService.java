package com.hexa.apicodingchallenge.security;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hexa.apicodingchallenge.model.User;
import com.hexa.apicodingchallenge.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    // Constructor DI
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find user by username or email
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    System.out.println("User not found with username : " + username);
                    return new UsernameNotFoundException("User not exists by Username ");
                });

        System.out.println("loadUserByUsername called with username: " + username);

        // Map the user's role enum to GrantedAuthority
        Set<GrantedAuthority> authorities = Set.of(new SimpleGrantedAuthority(user.getRole().name()));

        // Return UserDetails with username, password, and authorities
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
