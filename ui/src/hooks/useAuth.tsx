import React, {useCallback, useEffect, useState} from "react";
import {authenticate} from "../api/AuthApi";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../redux/auth/actions";
import {openNotification} from "../utils/Alert";
import {useNavigate} from "react-router";
import {UserRoles} from "../enum/UserEnum";
import {selectAuth} from "../redux/auth/reducer";
import {UserMiniDetailsType} from "../redux/user/types";

export default function useAuth(Component) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pinged, setPinged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [unauthAlertShown, setAlertShown] = useState(true);
    const {authenticated} = useSelector(selectAuth);

    const checkLogin = useCallback(() => {
        setLoading(true);
        authenticate()
            .then(res => {
                if (res) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
                console.log("profile response: ", res);
                const roles = res["roles"]
                const userMiniDetails: UserMiniDetailsType = {
                    username: res["username"],
                    email: res["username"],
                    roles: Object.values(UserRoles).filter(item => roles.includes(item))
                }
                // @ts-ignore
                dispatch(setAuth(userMiniDetails));
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error("Failed to authenticate", err);
                openNotification("Failed to authorize", "Please login again!")
                setAlertShown(false);
                navigate("/login");
            })
            .finally(() => {
                setLoading(false);
                setPinged(true);
            });
    }, []); //dispatch, setLoading, setPinged,

    useEffect(() => {
        if (!pinged) checkLogin();
    }, [checkLogin, pinged]);

    if (authenticated)
        return <React.Fragment>{Component}</React.Fragment>
    if (loading) return <div>Authenticating...</div>;

    return (
        <React.Fragment>
            {(isAuthenticated || authenticated) ? Component : <Navigate to={"/login"}/>}
        </React.Fragment>
    );
}