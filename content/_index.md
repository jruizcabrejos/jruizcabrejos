---
date: "2022-10-24"
design:
  spacing: 4rem
sections:
- block: resume-biography-3
  content:
    button:
      text: Download CV
      url: uploads/Jorge Ruiz Cabrejos 2025.pdf
    text: ""
    username: admin
  design:
    background:
      color: black
      image:
        filename: stacked-peaks.svg
        filters:
          brightness: 1
        parallax: false
        position: center
        size: cover
    css_class: dark
    spacing:
      padding:
      - 0
      - 0
      - 0
      - 0
- block: collection
  content:
    count: 5
    filters:
      author: ""
      category: ""
      exclude_featured: false
      exclude_future: false
      exclude_past: false
      publication_type: ""
      tag: ""
    offset: 0
    order: desc
    page_type: post
    subtitle: ""
    text: ""
    title: Recent Posts
  design:
    spacing:
      padding:
      - 4
      - 0
      - 0
      - 0
    view: date-title-summary
  id: news
- block: collection
  content:
    filters:
      exclude_featured: false
      exclude_future: false
      exclude_past: false
      folders:
      - publications
    text: ""
    title: Recent Research
  design:
    spacing:
      padding:
      - 4
      - 0
      - 0
      - 0
    view: citation
  id: publications-home
title: ""
type: landing
---
