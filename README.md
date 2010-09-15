# Introduction

`Mingi-Taw` is a very lightweight Topic Map Browser completely written in JavaScript.
It aims to quickly view any Topic Map source accessible to the browser, without the need for a heavyweight Topic Map infrastructure. It does not aim for any kind of persistence but will eventually make use of it.

# Dependencies
`Mingi-Taw` depends on Jan Schreibers [tmjs](http://github.com/jansc/tmjs) as Topic Maps enginge, [jQuery]([http://github.com/jquery/jquery) for some more conveniant JavaScript methods and makes use of Lars Heuers [Mappify WS](http://ws.mappify.org) for importing different Topic Map formats.

# Features
* Import any Topic Map format, Mappify can convert to JSON
  (currently xtm, ctm and jtm)
  Example URL: [Tom Waits](http://mappify.googlecode.com/svn/sandbox/tm2tm/waits.ltm)
* Browse any DBpedia and Wikipedia URI as Topic Map
  Example URL: [Mingi-Taw](http://en.wikipedia.org/wiki/Mount_Elbrus)
* Already JSON Topic Maps can be browsed directly

# Forthcoming features
* Integrated view of different sources
* Integration of TMExplore to navigate TMExplore enabled Websites
* node.js implementation for server-side JavaScript

# Features that may or may not be integrated
* [Maiana](http://maiana.topicmapslab.de) integration
  (for TMQL queries, TMCL validation, persistence etc.)
* Asynchronous mode: browse while still downloading

# Contact

For feedback or if you find any bugs or have comments or feature request
please use the issue tracker at

[project's homepage](http://github.com/DeX77/Mingi-Taw)


# Copyright and License

`Mingi-Taw` has been written by Daniel Exner (dex@dragonslave.de).
It is licensed under the GNU General Public License v3. See the file gpl-3.0.txt for details.