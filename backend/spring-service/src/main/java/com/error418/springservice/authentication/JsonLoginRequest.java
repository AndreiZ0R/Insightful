package com.error418.springservice.authentication;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JsonLoginRequest {
    @JsonProperty("email")
    private String email;
    @JsonProperty("password")
    private String password;
}
