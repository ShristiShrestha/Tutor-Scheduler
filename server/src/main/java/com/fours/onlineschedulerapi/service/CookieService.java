package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.AuthConstants;
import org.springframework.http.ResponseCookie;

import javax.servlet.http.Cookie;

public class CookieService {

    public static ResponseCookie getResponseCookie(String token, String email) {

        ResponseCookie responseCookie = ResponseCookie.from(email, token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(AuthConstants.JWT_TOKEN_VALIDITY)
                .build();

        return responseCookie;
    }
}
