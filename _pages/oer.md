---
layout: archive
title: "Open Educational Resources"
permalink: /oer/
---

Below are some open educational resources I've been involved in producing.

<!-- Auto-list any pages in pages/oer/ (excluding this index). -->
<ul class="list-unstyled">
  {% assign pages_in_oer = site.pages 
     | where_exp: "p", "p.path contains 'pages/oer/'" 
     | where_exp: "p", "p.url != '/oer/'" 
     | sort: "title" %}
  {% for p in pages_in_oer %}
    <li>
      <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
      {% if p.excerpt %} — {{ p.excerpt | strip_html }}{% endif %}
    </li>
  {% endfor %}
</ul>
