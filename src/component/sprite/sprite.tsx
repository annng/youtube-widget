import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import styles from "./style.module.css"

interface SpriteProps{
    key : number
    image : string
}

export default function Sprite(props : SpriteProps) {
  const [x, setX] = createSignal(Math.random() * (window.innerWidth / 2)); // Initial random position
  const [direction, setDirection] = createSignal(1); // 1 for right, -1 for left
  const [scale, setScale] = createSignal(1); // ScaleX for flipping
  const [flipPoint, setFlipPoint] = createSignal(
    Math.random() * (window.innerWidth - 100) // Random point to flip
  );
  let speed = Math.max(1, Math.random() * 2);

  createEffect(() => {
    flipPoint();
    
    speed = Math.max(1, Math.random() * 3)
  })

  onMount(() => {
    const interval = setInterval(() => {
      setX((prevX) => {
        const newX = prevX + direction() * speed;

        // Check if the sprite reaches its flip point or bounds
        if ((direction() === 1 && newX >= flipPoint()) || (direction() === -1 && newX <= flipPoint())) {
          // Flip direction
          setDirection((prevDirection) => -prevDirection);
          setScale((prevScale) => -prevScale);

          // Set a new flip point dynamically
          setFlipPoint(Math.random() * (window.innerWidth - 100));
        }

        // Handle boundary conditions (keep sprite within screen)
        if (newX < 0 || newX > window.innerWidth - 100) {
          setDirection((prevDirection) => -prevDirection);
          setScale((prevScale) => -prevScale);
        }

        return newX;
      });
    }, 16); // Update every 16ms (~60fps)

    // Cleanup interval on unmount
    onCleanup(() => clearInterval(interval));
  });
  
    return (
      <div class={styles.wrapper}>
        <div class={styles.chat_bubble}
        style={{
          position: "absolute",
          top: "10px",
        left: `${(x())}px`}}
        >
          <p>Hai Guys apa kabar</p>
        </div>
        <div
          id={`sprite-${props.key}`}
          class={styles.runner}
          style={{
            position: "absolute",
          left: `${x()}px`,
          top: "45px",
          width: "126px",
          height: "126px",
          background: `url(${props.image}) no-repeat`,
          backgroundSize: "cover",
          transform: `scaleX(${scale()})`,
          }}
        />
      </div>
    );
  }