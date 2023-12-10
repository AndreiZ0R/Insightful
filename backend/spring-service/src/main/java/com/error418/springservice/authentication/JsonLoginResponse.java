package com.error418.springservice.authentication;

import com.error418.springservice.model.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JsonLoginResponse {
    @JsonProperty("token")
    private String token;
    private User user;
}
