---
title: "Getting Comfortable with Graphs in Seaborn"
date: 2026-05-03
permalink: /oer/seaborn-graphs/
excerpt: "Short intro video, a downloadable Jupyter Notebook, and useful links."
# layout comes from your collection defaults
# Optional: tags: [python, seaborn, plotting, visualisation]
---

## Overview
This resource will help you get started with using the Python library seaborn for plotting graphs.

## Watch the video guide

<div class="oer-video">
  <video controls preload="metadata">
    <source src="{{ '/files/seaborn_presentation.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>
</div>

<p>
  <a class="btn btn--primary" href="{{ '/files/seaborn_presentation.mp4' | relative_url }}" download>
    Download the video (MP4)
  </a>
</p>

<style>
/* Keep the video responsive within Minimal Mistakes/AcademicPages */
.oer-video video {
  width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: 6px;
}
</style>

## Transcript

- Download the transcript:
  <a href="{{ '/files/seaborn_script.txt' | relative_url }}" download>seaborn_script.txt</a>

- Or read it inline below:

<details class="oer-transcript">
  <summary>Show transcript</summary>
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

<br><br>

<!-- Open the same notebook directly in Google Colab -->
<a href="https://colab.research.google.com/?url={{ '/files/seaborn_notebook.ipynb' | relative_url | absolute_url | uri_escape }}"
   target="_blank" rel="noopener">
  Or open this notebook in Google Colab
</a>

## CC License
This work was created by James Donaldson with help from Clare Pridans, Martina Cerna, and Victoria Lindsay‑McGee as part of the University of Edinburgh Postgraduate Certificate in Academic Practice.

This work is licensed under a
<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noopener">
  Creative Commons Attribution‑ShareAlike 4.0 International License (CC BY‑SA 4.0)
</a>.
