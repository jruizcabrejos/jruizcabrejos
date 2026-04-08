---
authors:
- admin
date: "2025-02-01"
image:
  caption: 'Panel from the webcomic Emmy the Robot by [**Dominic Cellini**](https://www.webtoons.com/en/canvas/emmy-the-robot/list?title_no=402201)'
summary: 'This title is all but accessible. Mapping the calendar of furniture (trastos) collection from Barcelona Ajuntament website.'
tags:
- Pet project
- Me
- Data
title: "Accesibble Frugality: Barcelona Trastos Map and Data"
---

### Proverb

"One man's trash is another man's treasure" is a ~~proverb~~ [pithicism](https://wordlust.blogspot.com/2006/10/pithicism.html){{< pagenote "Play on words from a 'euphemism-collector'"/>}} that I have, over time, grown to be fond of.

In the city of Barcelona, Catalonia, there is a good chance you will find something interesting in between the junk and laid waste. Every day people transiting the streets tend to partake on this activity (picking up "trash") for a few reasons.

<img src="./figure1_me.png" alt="Me on the garbage" style="width: 60%; height: auto;">
<figcaption>Figure 1. The beer was not found in the trash. Taken in Paris, France, 2022.</figcaption>

Some do it out of necessity, or desperation, as is the case of the [more than ~3,000](https://www.ecologiapolitica.info/recicladores-informales-barcelona/) <em>'trash scavengers'</em>{{< pagenote "_English_" />}} roaming among containers for pieces of metal and other scraps to make a living out of recycling. 

This is for many a profession, often informal, and nowadays predominantly associated with immigrants, despite the trade having [a long history within locals](https://www.youtube.com/watch?v=LbjgCCcCOl4) going back [centuries](https://eltranvia48.blogspot.com/2015/03/los-traperos-en-la-historia-de-barcelona.html), with some <em>'drapaires'</em>{{< pagenote "_Catalan_" />}} having achieved [long-lasting cultural legacies](https://catalunyaplural.cat/ca/cal-drapaire-o-la-genesis-duna-llegenda/).

And, because nothing is sacred under capitalism, it is also a business worth almost 10,000 million euros, in which recycling is estimated to move [1% of the country GDP every year](https://distintaslatitudes.net/indispensables-pero-invisibles/migrantes-chatarreros-en-barcelona).

Chances are, you have also seen or met your local <em>'chatarrero'</em>{{< pagenote "_Spanish_" />}} at one time or another.

<img src="./figure2_chatarrero_google_search.png" alt="Chatarrero picture google">
<figcaption>Figure 2. </figcaption>

Other individuals pick up trash in a more recreational manner, almost as if it were a sport, or some form of [safari](https://web.archive.org/web/20090520052742/http://www.basurama.org/safaribasura.htm) in which you are hunting for furniture that could be salvaged or restored. 

Among privileged immigrants, furnishing your new apartment with something found on the streets tends to be an experience shared by many{{< pagenote "I wanted to call it an 'almost universal experience', but I digress, I need data to prove that"/>}} in social media.

<img src="./figure3_instareels.jpg" alt="Instagram Reels with the average immigrant experience">
<figcaption>Figure 3. </figcaption>

Similar to thrifting clothes, sometimes all it takes is one really good find.

### Beggars can't be choosers

"Where and when can I salvage old, abandoned, furniture in Barcelona?"

This is a question that my friends, friends of friends, coworkers and myself have asked from time to time (as unlikely as it may sound).

Unfortunately, the town hall (Ajuntament/Municipality) of Barcelona only provides this information for individual street searches.

<img src="./figure4_barcelona_trastos_UI.png" alt="UI of the website" style="width: 60%; height: auto;">
<figcaption>Figure 4. </figcaption>

This makes it ~~impossible~~ annoyingly difficult to have a simple map with exact locations and dates in order to plan for any trash rummaging expedition. 

And although some maps exist for specific districts, a single image containing all of the information for the whole of Barcelona remains elusive.


### A picture is worth a thousand words

In 2010 Zara Patterson was the first to make a [public online map](https://www.google.com/maps/d/u/0/viewer?mid=1l2VAhplHwkWYhNi6WOcDeqnxPoE&shorturl=1&ll=41.396674791413474%2C2.1627183782959447&z=13) with information regarding when, and where, one could throw (or in this case, find) old furniture in the streets of Barcelona.

She did so as part of her blog ["Caer en Gracia"](https://caerengracia.wordpress.com/) where she ["lists resources to carry on restoration and renovation works ecologically"](https://caerengracia.wordpress.com/eco-recursos/).

<img src="./map_caerengracia.png" alt="Old Map">
<figcaption>Figure 5. </figcaption>

Unfortunately, the map has a few inaccuracies, with certain neighborhoods within districts not displaying the right pick up day of the week.

The map was last updated in 2016.

A second map, of low resolution and similarly outdated, sometimes also [makes the rounds within the internet](https://vaciadosbarcelona.com/dia-de-recogida-de-muebles-en-barcelona/). It was originally from a 2011 article that is no longer accessible [unless you use the Wayback Machine](https://web.archive.org/web/20110626070437/http://www.bcn.es/publicacions/b_informacio/bi_91/08-09.pdf).

<img src="./map_pixelated_2011.png" alt="Old Map">
<figcaption>Figure 6 </figcaption>


### There is more than one way to skin a cat

Since I couldn't find a complete, up-to-date map of Barcelona with the days of the week in which furniture/trastos are collected, I compiled the data from the Ajuntament website and made my own maps. 

I did this in two steps:

- First, I downloaded a dataset containing all of the street names within the city of Barcelona from the portal ["Open Data Barcelona"](https://opendata-ajuntament.barcelona.cat/data/es/dataset/carrerer). With this information, I then set up a data scrapper with RSelenium. This scrapper looped through all the streets available in the website.

<img src="./firefox_hYxHdfeUpx.gif" alt="Animation of data scrapping" style="width: 60%; height: auto;">
<figcaption>Figure 7 </figcaption>

- Then, once all the data for each street/number is collected, I geocoded{{< pagenote "gave them a latitude/longitude coordinate" />}} each street name with the OpenStreet Map API, using the httr2 package.

This two-step procedure is [documented in the github for this project](https://github.com/jruizcabrejos/barcelona_trastos_eng).

### It is what it is

And if you are reading this, these maps are now yours too, and I hope you find something nice in the trash.

<img src="./eng_Map_Barcelona_Furniture_Junk_Map_days.png" alt="barcelona_map_trastos">


### Pithicism

It took me more than a year to finish writing this blog post properly. The scrapping script went through several iterations until I had something that worked "cleanly" enough{{< pagenote " or that I liked enough" />}}. 

As of April 5, 2026, I can call this done.

Did you know, read, or heard about _frugality_ before?

{{< youtube RoP5MdpMBc4 >}}


By the way: _Land doesn't vote_... dots do (?)

<img src="./eng_dots_Barcelona_Furniture_Junk_Map_days.png" alt="barcelona_map_trastos">

