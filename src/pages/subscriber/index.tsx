import { Component } from "solid-js";
import { createSignal, createEffect, onCleanup } from "solid-js";
import MilestoneProgress from "../../component/milestone/milestone_bar";
import styles from "./style.module.css"

export default function SubscriberPage() {

    // Define types for YouTube API response
const REFRESH_INTERVAL = import.meta.env.REFRESH_INTERVAL || 60000

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
  
    const [subscriberCount, setSubscriberCount] = createSignal<string | null>(null);
    const [error, setError] = createSignal<string | null>(null);

    // Function to fetch subscriber count
  const fetchSubscriberCount = async (): Promise<void> =>   {
    console.log(REFRESH_INTERVAL)
    try {
        const response = await fetch(`/api/subscriber`);
        const data = await response.json();
        const count = data.items?.[0]?.statistics?.subscriberCount;
      setSubscriberCount(count || "0");
      setError(null);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error(err);
    }
  };

   // Auto-refresh using setInterval
   createEffect(() => {
    // fetchSubscriberCount(); // Fetch immediately on component mount
    // const interval = setInterval(fetchSubscriberCount, REFRESH_INTERVAL);

    // onCleanup(() => clearInterval(interval)); // Clear interval on component unmount
  });

  return  <div class={styles.wrapper}>
  <h1>YouTube Subscriber Count</h1>
  <MilestoneProgress title= "Update Mic" current_progress={3000} total_progress={1000}/>
  {error() ? (
    <p style={{ color: "red" }}>Error: {error()}</p>
  ) : subscriberCount() ? (
    <MilestoneProgress title= "Update Mic" current_progress={3000} total_progress={1000}/>
  ) : (
    <p>Loading...</p>
  )}
</div>;
};