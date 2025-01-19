import { Component } from "solid-js";
import { createSignal, createEffect, onCleanup, createMemo } from "solid-js";
import MilestoneProgress from "../../component/milestone/milestone_bar";
import styles from "./style.module.css"

export default function SubscriberPage() {

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCZYQ9SOiYqJ4NgZva3M8GAg";

    // Define types for YouTube API response
const REFRESH_INTERVAL = import.meta.env.VITE_REFRESH_INTERVAL || 60000
const TITLE_MILESTONE = import.meta.env.VITE_TITLE_SUBSCRIBER_MILESTONE
const TARGET_MILESTONE = import.meta.env.VITE_TARGET_SUBSCRIBER_MILESTONE || 0

interface YouTubeAPIResponse {
    items?: {
      statistics?: {
        subscriberCount?: string;
      };
    }[];
    error?: {
      message: string;
    };
  }
  
    const [subscriberCount, setSubscriberCount] = createSignal<string | "0">("0");
    const [error, setError] = createSignal<string | null>(null);

    const memoizedCurrentProgress = createMemo(() => subscriberCount());


    // Function to fetch subscriber count
  const fetchSubscriberCount = async (): Promise<void> =>   {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
          );
        const data = await response.json();
        const count = data.items?.[0]?.statistics?.subscriberCount;
      setSubscriberCount(count || "0");
      setError(null);
    } catch (err) {
        console.log(err)
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.log(errorMessage);
    }
  };

   // Auto-refresh using setInterval
   createEffect(() => {
    fetchSubscriberCount(); // Fetch immediately on component mount
    const interval = setInterval(fetchSubscriberCount, REFRESH_INTERVAL);

    onCleanup(() => clearInterval(interval)); // Clear interval on component unmount
  });

  return  <div class={styles.wrapper}>
  {error() ? (
    <p style={{ color: "red" }}>Error: {error()}</p>
  ) : subscriberCount() ? (
    <MilestoneProgress title= {TITLE_MILESTONE} current_progress={Number(memoizedCurrentProgress())} total_progress={TARGET_MILESTONE}/>
  ) : (
    <p>Loading...</p>
  )}
</div>;
};