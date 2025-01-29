import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";

const clientId = import.meta.env.VITE_CLIENT_ID
const redirectUri = "http://" + window.location.host + "/callback"
const authUrl = "https://accounts.google.com/o/oauth2/v2/auth";

const LoginPage: Component<{}> = (props) => {

    const login = () => {
        // console.log(redirectUri)
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: "token",
            scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly", // Adjust scopes based on your needs
            access_type: "online",
            state: "xyz123", // Optional: use to prevent CSRF attacks
        });

        window.location.href = `${authUrl}?${params.toString()}`;
    };


    return (<div>
        <button onclick= { login } > Login with Google</button>
        </div>);
}

export default LoginPage