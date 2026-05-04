---
title: "Getting Comfortable with Graphs in Python seaborn"
date: 2026-05-03
permalink: /oer/seaborn-graphs/
excerpt: "Short intro video, a downloadable Jupyter Notebook, and useful links."
# layout comes from your collection defaults
# Optional: tags: [python, seaborn, plotting, visualisation]
---

## Overview
This Online Educational Resource supports students to create visualisations with Python for APA reports.
 
The exercise should take exactly 10 minutes.  The first part involves teacher-led guidance in you can follow along with instructions, interacting with the notebook on your own computer as you listen to guidance.  It should then take around 4 minutes in the second part to apply what you've learned to a new dataset.
 
We have tried to make the OER accessible to people who are d/Deaf or hard of hearing by attaching a text file with the transcript for the video.

## Watch the video guide

<div class="oer-video">
  <video controls preload="metadata">
    <source src="{{ '/files/seaborn_presentation.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>
</div>
<style>
/* Keep the video responsive within Minimal Mistakes/AcademicPages */
.oer-video video {
  width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: 6px;
}
</style>

<details class="oer-transcript">
  <summary>Show video transcript</summary>
  <pre id="seaborn-transcript" aria-label="Video transcript">Loading transcript…</pre>
</details>

<script>
(function() {
  const el = document.getElementById('seaborn-transcript');
  if (!el) return;
  fetch('{{ "/files/seaborn_script.txt" | relative_url }}', { cache: 'no-store' })
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(text => { el.textContent = text; })
    .catch(() => {
      el.textContent = "Couldn't load the transcript. Please use the download link above.";
    });
})();
</script>

<style>
/* Make plain-text transcripts readable */
.oer-transcript pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: var(--mm-callout-bg, #f6f6f6);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}
</style>

## Get started

<a class="btn btn--primary" href="{{ '/files/seaborn_notebook.ipynb' | relative_url }}" download>
  Download the Jupyter Notebook
</a>

<a class="btn btn--primary" href="https://colab.research.google.com/?url={{ '/files/seaborn_notebook.ipynb' | relative_url | absolute_url | uri_escape }}"
   target="_blank" rel="noopener">
  Or open in Google Colab
</a>

## CC License
This work was created by [James Donaldson](https://jamesdonaldson.github.io/) with help from [Clare Pridans](https://inflammation-research.ed.ac.uk/research/research-groups/dr-clare-pridans), [Martina Cerna](https://www.linkedin.com/in/martina-%C4%8D-ba2b52217/), and Victoria Lindsay‑McGee as part of the University of Edinburgh Postgraduate Certificate in Academic Practice.


This work is licensed under a
<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noopener">
  Creative Commons Attribution‑ShareAlike 4.0 International License (CC BY‑SA 4.0)
</a>.
