const form = document.querySelector("#track-form") as HTMLFormElement;
const titleInput = document.querySelector("#title") as HTMLInputElement;
const durationInput = document.querySelector("#duration") as HTMLInputElement;
const list = document.querySelector("#list") as HTMLUListElement;
const totalEl = document.querySelector("#total") as HTMLSpanElement;

type Track = {
  title: string;
  duration: number;
};

let tracks: Track[] = [];

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

  // hide/show empty state
  const emptyState = document.querySelector(".empty-state") as HTMLElement;
  if (tracks.length === 0) {
    emptyState.style.display = "";
  } else {
    emptyState.style.display = "none";
  }

  let totalSeconds = 0;

  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.className = "track-item";

    const infoDiv = document.createElement("div");
    infoDiv.className = "track-info";

    const titleDiv = document.createElement("div");
    titleDiv.className = "track-title";
    titleDiv.textContent = track.title;
    infoDiv.appendChild(titleDiv);

    const durationDiv = document.createElement("div");
    durationDiv.className = "track-duration";
    // clock icon
    const clockIcon = document.createElement("i");
    clockIcon.className = "fa-regular fa-clock";
    durationDiv.appendChild(clockIcon);
    durationDiv.append(` ${formatDuration(track.duration)}`);
    infoDiv.appendChild(durationDiv);

    li.appendChild(infoDiv);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", `Delete ${track.title}`);
    deleteBtn.title = `Delete ${track.title}`;
    // trash icon
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash-can";
    deleteBtn.appendChild(trashIcon);
    deleteBtn.addEventListener("click", () => {
      tracks = tracks.filter((_, i) => i !== index);
      render();
    });
    li.appendChild(deleteBtn);

    list.appendChild(li);
    totalSeconds += track.duration;
  });

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
