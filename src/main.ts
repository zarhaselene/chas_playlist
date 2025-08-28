const form = document.querySelector("#track-form") as HTMLFormElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const durationInput = document.querySelector("#duration") as HTMLInputElement;
const list = document.querySelector("#list") as HTMLUListElement;
const totalEl = document.querySelector("#total") as HTMLSpanElement;

type Track = {
  title: string;
  duration: number;
};

const tracks: Track[] = [];

function parseDuration(input: string): number | null {
  const parts = input.split(":");
  if (parts.length !== 2) return null;

  const minutes = parseInt(parts[0] ?? "0", 10);
  const seconds = parseInt(parts[1] ?? "0", 10);

  if (isNaN(minutes) || isNaN(seconds) || seconds >= 60) return null;

  return minutes * 60 + seconds;
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
