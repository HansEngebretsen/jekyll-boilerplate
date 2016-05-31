Jekyll Boilerplate
================

## About
** Still a work in progress **

## Architecture
Based on a Simple boilerplate that uses grunt, sass, compass, imagemin, autoprefixer and watch. Need to run the following commands to kick things off

Includes the grid from bootstrap 3, as well as a small boilerplate I created. Both Sass and JS is written very modularly as well. Dependencies on Waypoints & inview for scrolling functions.
Also contains some interesting class toggle functions, all still WIP.

## Config
Everything from the src directory gets either compiled or copied over into htdocs. **Do not edit anything in the htdocs folder** as it will all be overwritten.

  #### Environments
  Most of the config is handled via standard jekyll config variables in the _config.yml, there are environments that can be setup through editing the _config_prod.html and the _config_stage.html files. Based on the architecture discussed [here](https://stackoverflow.com/questions/27386169/change-site-url-to-localhost-during-jekyll-local-development/).


## Getting started
Make sure you have Ruby installed then install the things below as needed


  #### Jekyll
   -`gem update system`
   -`gem install jekyll`

  #### Grunt
    -`gem update system`
   -`gem install jekyll`

Important to note: URL's are generated statically, so in order to deploy, you'll need to change the baseurl via the environments config files to the baseurl you'll be deploying to.

Still having trouble?
[check this out](http://bfy.tw/3rxO)