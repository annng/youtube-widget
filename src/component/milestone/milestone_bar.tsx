import { Component } from "solid-js";
import styles from './milestone_bar.module.css'

interface MilestoneProgressProps {
  title : string
  current_progress: number;
  total_progress: number;
}

const MilestoneProgress: Component<MilestoneProgressProps> = (props) => {
  const progressPercentage = () =>
    Math.min(
      (props.current_progress / props.total_progress) * 100,
      100
    ).toFixed(2); // Ensure it doesn't exceed 100%

    
  
  return (
    <div class={styles.container}>
      <h2 class={styles["title-progress-bar"]}>{props.title}</h2>
      <div
        class={styles["container-bar"]}>
        <div
          class={styles["inactive-progress-bar"]}>
          <div
            class={styles["active-progress-bar"]} style={{ width: `${progressPercentage()}%` }}/>
        </div>
        <p class={styles["progress-text"]}>
          {new Intl.NumberFormat("en-US").format(props.current_progress)} /{" "}
          { new Intl.NumberFormat("en-US").format(props.total_progress)} Subscribers (
          {progressPercentage()}%)
        </p>
      </div>
    </div>
  );
};

export default MilestoneProgress;
