import { Component, createSignal, Index, onMount } from "solid-js";
import styles from './style.module.css';
import { createStore } from "solid-js/store";
import Sprite from "../../component/sprite/sprite";
import { getRandomInt } from "../../utils/numberUtils";
import { useSearchParams } from "@solidjs/router";

const api_key  = import.meta.env.VITE_YOUTUBE_API_KEY
const CommentAvatarPage : Component<{}> = (props) => {
    const [param] = useSearchParams();

    const [liveChatId, setliveChatId] = createSignal();

    let avatars = ["gorgon_run1.png", "gorgon_run2.png", "gorgon_run3.png"]
    const [sprites, setSprites] = createStore([{img : avatars[getRandomInt(0, avatars.length-1)], x : Math.random() * window.innerWidth}, 
        {img : avatars[getRandomInt(0, avatars.length-1)], x : Math.random() * window.innerWidth},
         {img : avatars[getRandomInt(0, avatars.length-1)], x : Math.random() * window.innerWidth}])

    onMount(() => {
        if(param.token != ""){
            searchChannel(param.token).catch((error) => console.error("Cannot found channel : ", error))
        }
    });


    //look like doesn't need to retrieve this API because we should login directly into our youtube account to get this one. not from search
    const searchChannel = async (token : string) => {
        
        try{
            const params = new URLSearchParams({
                "part" : "snippet",
                "eventType" : "live",
                "type" : "video",
                "channelId" : "UCZYQ9SOiYqJ4NgZva3M8GAg",
                "key" : api_key

            })

            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`, {
                method: "GET",
                headers : {
                    "Content-Type": "application/x-www-form-urlencoded",
                    // "Authorization": "Bearer " + token
                }
            });

        
            if (!response.ok) {
                throw new Error("Failed to search channel");
            }

            const data = await response.json();

            if(data.items.length > 0){
                //todo fetch live broadcast
            }

        }catch(error){
            console.error(error)
        }
    }

    const broadcastLive = async (token : string) => {
        try{
            const params = new URLSearchParams({
                "part" : "id,snippet",
                "broadcastStatus" : "active",
                "broadcastType" : "all",
                "key" : api_key

            })

            const response = await fetch(`https://www.googleapis.com/youtube/v3/liveBroadcasts?${params.toString()}`, {
                method: "GET",
                headers : {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": token
                }
            });

        
            if (!response.ok) {
                throw new Error("Failed to search channel");
            }

            const data = await response.json();

            if(data.items.length > 0){
                setliveChatId(data.items[0].snippet.liveChatId)
            }

        }catch(error){
            console.error(error)
        }
    }

    // <p>{param.token}</p>
    return (
        <div>
            
            <div class={styles.container}>
                <Index each={sprites}>
                {(sprite, index) => <Sprite key={index} image={`public/assets/img/${sprite().img}`} />}
                </Index>
            </div>
        </div>
    );
};  

export default CommentAvatarPage;