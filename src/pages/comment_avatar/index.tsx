import { Component, Index, onMount } from "solid-js";
import styles from './style.module.css';
import { createStore } from "solid-js/store";
import Sprite from "../../component/sprite/sprite";
import { getRandomInt } from "../../utils/numberUtils";
import { useSearchParams } from "@solidjs/router";
const CommentAvatarPage : Component<{}> = (props) => {
    const [param] = useSearchParams();

    let avatars = ["gorgon_run1.png", "gorgon_run2.png", "gorgon_run3.png"]
    const [sprites, setSprites] = createStore([{img : avatars[getRandomInt(0, avatars.length-1)], x : Math.random() * window.innerWidth}, 
        {img : avatars[getRandomInt(0, avatars.length-1)], x : Math.random() * window.innerWidth},
         {img : avatars[getRandomInt(0, avatars.length-1)], x : Math.random() * window.innerWidth}])

    onMount(() => {

    });

    // <p>{param.token}</p>
    return (
        <div>
            
            <div class={styles.container}>
                <Index each={sprites}>
                {(sprite, index) => <Sprite key={index} image={`src/assets/img/${sprite().img}`} />}
                </Index>
            </div>
        </div>
    );
};  

export default CommentAvatarPage;