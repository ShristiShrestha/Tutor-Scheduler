import React, {useCallback, useState} from "react";
import {authenticate} from "../api/AuthApi";
import {Navigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuth} from "../redux/auth/actions";

export default function useAuth(Component) {
    const dispatch = useDispatch();
    const [pinged, setPinged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const checkLogin = useCallback(() => {
        setLoading(true);
        // todo: call ping to get logged user info
        authenticate()
            .then(res => {
                if (res) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
                // @ts-ignore
                dispatch(setAuth(res));
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error("Failed to authenticate", err);
            })
            .finally(() => {
                setLoading(false);
            });
        setPinged(true);
    }, [dispatch, setLoading, setPinged, setIsAuthenticated]);

    // useEffect(() => {
    //     if (!pinged) checkLogin();
    // }, [checkLogin, pinged]);

    if (loading) return <div>Authenticating...</div>;

    return (
        <React.Fragment>
            {isAuthenticated ? Component : <Navigate to={"/login"}/>}
        </React.Fragment>
    );
}