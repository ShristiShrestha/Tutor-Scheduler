package com.fours.onlineschedulerapi.controller;

import com.fours.onlineschedulerapi.auth.AuthService;
import com.fours.onlineschedulerapi.auth.JwtUserDetailService;
import com.fours.onlineschedulerapi.dto.UserDto;
import com.fours.onlineschedulerapi.model.JwtRequest;
import com.fours.onlineschedulerapi.model.JwtResponse;
import com.fours.onlineschedulerapi.model.User;
import com.fours.onlineschedulerapi.service.AuthenticatedUserService;
import com.fours.onlineschedulerapi.service.CookieService;
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

    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
            throws Exception {
        String email = authenticationRequest.getEmail();

        authService.authenticate(email, authenticationRequest.getPassword());

        final String token = jwtTokenUtil.generateToken(email);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        CookieService.getResponseCookie(token).toString())
                .build();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        final String userName = authenticatedUserService.getUsername();

        final User userDetails = userDetailsService
                .loadUser(userName);

        return new ResponseEntity<>(
                new UserDto(userDetails),
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
