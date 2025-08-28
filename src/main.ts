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
