package com.fours.onlineschedulerapi.service;

import com.fours.onlineschedulerapi.constants.AuthConstants;
import org.springframework.http.ResponseCookie;

import static com.fours.onlineschedulerapi.constants.AuthConstants.COOKIE_TOKEN_PREFIX;

public class CookieService {

    public static ResponseCookie getResponseCookie(String token) {

        ResponseCookie responseCookie = ResponseCookie.from(COOKIE_TOKEN_PREFIX, "Bearer " + token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(AuthConstants.JWT_TOKEN_VALIDITY)
                .build();

        return responseCookie;
    }

    public static String getTokenFromCookieString(String cookie) {
        String[] cookieItems = cookie.split(";");
        String token = "";

        for (String item: cookieItems) {
            if (item.startsWith(COOKIE_TOKEN_PREFIX)) {
                token = item.split("=")[1];
                token = token.split(" ")[1];
                System.out.println("Token recieved: " + token);
            }
        }

        return token;
    }
}
