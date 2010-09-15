/*
Mingi-Taw
http://github.com/DeX77/Mingi-Taw
Copyright (c) 2010 Daniel Exner <dex@dragonslave.de>
Licensed under the GNU General Public License v3.

Mingi-Taw is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Mingi-Taw is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Mingi-Taw.  If not, see <http://www.gnu.org/licenses/>.
*/

function jsonp(url) {
  var script = document.createElement('script');

  script.src = url;

  document.body.appendChild(script);    
};

function do_mappify(url) {  
  mappify_prefix = 'http://ws.mappify.org/';    
  mappify_wp = mappify_prefix + 'wp/url/';  
  mappify_tm2tm = mappify_prefix + 'tm2tm/?tm=';  
  mappify_jsonp = 'out=json&callback=mappified';
  
  if (url.match(/(json|jtm)/)){
   request = url;
  }
  else if (url.match(/(wikipedia|dbpedia)/)){
    request = mappify_wp + escape(url)+ '?' +mappify_jsonp;
  }
  else {
    request = mappify_tm2tm + escape(url)+ '&' + mappify_jsonp;
  }
  
  tms = create_tms();
  tm = create_tm(sys, url);
  
  jsonp(request);
  
};
  
function create_tms() {
  factory = TopicMapSystemFactory.newInstance();
  factory.setProperty('com.semanticheadache.tmjs.backend', 'memory');
  sys = factory.newTopicMapSystem();
  return sys;
};

function create_tm(sys, url) {
  tmid = sys.createLocator(url);
  tm = sys.createTopicMap(tmid);
  return tm;
};
  
function print_sis(topic) {
  si_title = document.createElement('div');
  si_title.setAttribute('class', 'subjectidentifier_title');
  si_title_text = document.createTextNode('SubjectIdentifier: ');
  si_title.appendChild(si_title_text);
  
  $.each(topic.getSubjectIdentifiers(), function(index, si) { 
    si_div = document.createElement('div');
    si_div.setAttribute('class', 'subjectidentifier');
    si = document.createTextNode(si.getReference());
    si_div.appendChild(si);
    si_title.appendChild(si_div);
  });
  
  return si_title;
};

function print_characteristic(char) {
  if (char.getType().getSubjectIdentifiers()[0].getReference() ===
  'http://psi.topicmapslab.de/tmexplore/mi') {
    mi_div = document.createElement('div');
    mi_div.setAttribute('class', 'more_information');
    mi_div.setAttribute('onclick', "do_mappify('"+char.getValue()+"'); return false");
    mi_text = document.createTextNode('Include data from '+ char.getValue());
    mi_div.appendChild(mi_text);
    return mi_div;
  }
  else {
    char_div = document.createElement('div');
    char_div.setAttribute('class', 'characteristic');  
    first_name = char.getType().getNames()[0];
    
    if (first_name != null) {
      name = first_name.getValue();
    }
    else {
      name ='default';
    }
    
    char_text = document.createTextNode(name +"="+char.getValue());
    char_div.appendChild(char_text);
    return char_div;  
  }
};

function print_characteristics(chars, parent) {  
  $.each(chars, function(index, char) {
    char_div = print_characteristic(char);    
    parent.appendChild(char_div);    
  });
};

function print_names(topic) {

  names = topic.getNames();
  names_div = document.createElement('div');
  names_div.setAttribute('class', 'name_title');
  names_text = document.createTextNode("Names: ");  
  names_div.appendChild(names_text);
  
  print_characteristics(names, names_div);
  
  return names_div;
};

function print_occurrences(topic) {
  occs = topic.getOccurrences();
  occs_div = document.createElement('div');
  occs_div.setAttribute('class', 'occurrences_title');
  occs_text = document.createTextNode("Occurrences: ");
  occs_div.appendChild(occs_text);
  
  print_characteristics(occs, occs_div);
  
  return occs_div;
};

function print_all_topics() {
  $.each(tm.getTopics(), function(index, topic) { 
    topic_div = document.createElement('div');
    label = best_label(topic);
    id = topic.getId();
    tm_base_loc_ref = tm.getLocator().getReference();
    topic_label = document.createTextNode(label);
    topic_div.setAttribute('class', 'topic_label');
    topic_div.setAttribute('onclick', "print_topic("+id+", '"+tm_base_loc_ref+"'); return false");
    topic_div.setAttribute('id', id);
    topic_div.appendChild(topic_label);
    document.body.appendChild(topic_div);
  });
};

function print_topic(topic_id, base_iri) {
    
    tms.getTopicMap(base_iri);    
    topic = tm.getConstructById(topic_id);
    topic_div = document.getElementById(topic_id);

    topic_div.appendChild(print_sis(topic));
    topic_div.appendChild(print_names(topic));
    topic_div.appendChild(print_occurrences(topic));
};

function best_label(topic) {
  first_si = topic.getSubjectIdentifiers()[0];
  first_loc = topic.getSubjectLocators()[0];
  first_ii = topic.getItemIdentifiers()[0];
  
  if (first_si != null) {
    return first_si.getReference();
  }
  else if (first_loc != null) {
    return first_loc.getReference();
  }
  else {
    return first_ii.getReference();
  }
  
};

function mappified(data) {
    reader = new TM.JTM.Reader(tm);    
    reader.fromObject(data);    
    print_all_topics();    
    return true;
};
  

  