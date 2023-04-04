package com.fours.onlineschedulerapi.controller;

import com.fours.onlineschedulerapi.auth.AuthService;
import com.fours.onlineschedulerapi.auth.JwtUserDetailService;
import com.fours.onlineschedulerapi.model.JwtRequest;
import com.fours.onlineschedulerapi.model.JwtResponse;
import com.fours.onlineschedulerapi.service.AuthenticatedUserService;
import com.fours.onlineschedulerapi.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailService userDetailsService;

    @Autowired
    private AuthenticatedUserService authenticatedUserService;

    private final String AUTHORIZATION = "Authorization";
    private final String BEARER = "Bearer ";

    @PostMapping(value = "/access-token")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authService.authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());

        final String token = jwtTokenUtil.generateToken(userDetails);

        HttpHeaders headers = new HttpHeaders();
        headers.add(AUTHORIZATION, BEARER + token);

        return new ResponseEntity<>(
                new JwtResponse(
                        token, userDetails.getUsername(), userDetails.getAuthorities()
                ),
                headers,
                HttpStatus.OK
        );
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        final String userName = authenticatedUserService.getUsername();

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(userName);

        return new ResponseEntity<>(
                new JwtResponse(
                      userDetails.getUsername(), userDetails.getAuthorities()
                ),
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/check")
    public ResponseEntity<?> checkAuthentication() {
        String username = authenticatedUserService.getUsername();

        List<String> authorities = authenticatedUserService.getAuthorities();

        return ResponseEntity.ok("Authentication works!");
    }
}
