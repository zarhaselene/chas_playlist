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

function render() {
  list.innerHTML = "";

  let totalSeconds = 0;

  for (const track of tracks) {
    const li = document.createElement("li");
    li.textContent = `${track.title} (${formatDuration(track.duration)})`;
    list.appendChild(li);

    totalSeconds += track.duration;
  }
  totalEl.textContent = formatDuration(totalSeconds);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const durationStr = durationInput.value.trim();
  const duration = parseDuration(durationStr);

  if (!title || duration === null) {
    alert("Fel format, skriv t.ex. '2:45'");
    return;
  }
  const track: Track = { title, duration };
  tracks.push(track);

  // reset form
  titleInput.value = "";
  durationInput.value = "";

  render();
});
