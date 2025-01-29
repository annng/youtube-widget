import { useNavigate } from "@solidjs/router";
import { Component, createEffect } from "solid-js";



const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET

const CallbackPage: Component<{}> = (props) => {

    const navigate = useNavigate();

    createEffect(() => {

        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get("access_token");
        if (token) {
            // Exchange the code for an access token
            fetchAccessToken(token)
                .then(() => navigate("/comment_avatar?token=" + token)) // Redirect after login
                .catch((error) => console.error("Token Exchange Error:", error));
        } else {
            console.error("Authorization failed:", params.get("error"));
        }
    });

    const fetchAccessToken = async (code: string) => {
        try {
            const response = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: "#",
                    grant_type: "authorization_code",
                    code,
                }).toString(),
            });

            if (!response.ok) {
                throw new Error("Failed to exchange token");
            }

            const data = await response.json();
            console.log("Access Token:", data.access_token);
            // Store the access token securely (e.g., in memory, context, or secure storage)
        } catch (error) {
            console.error("Error fetching access token:", error);
        }
    };

    return (
        <div>
        <h1>Processing Login...</h1>
            </div>
    );

}

export default CallbackPage

