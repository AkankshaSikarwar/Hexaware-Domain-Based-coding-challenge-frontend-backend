package com.hexa.apicodingchallenge.dto;

public class JWTAuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserDto userDto; // Appending user details and JWT token in response

    // Constructors
    public JWTAuthResponse() {}

    public JWTAuthResponse(String accessToken, UserDto userDto) {
        this.accessToken = accessToken;
        this.userDto = userDto;
    }

    // Getters and setters
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }
}
