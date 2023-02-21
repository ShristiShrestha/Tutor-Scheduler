package com.fours.onlineschedulerapi.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JwtResponse implements Serializable {

    private String token;

    private String username;

    private Collection<? extends GrantedAuthority> roles;
}
