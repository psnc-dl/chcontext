# CHContext

CHContext is a JavaScript-based widget that is able to provide a list of links to cultural heritage materials based on predefined item of a website on which it is embedded (via given JQuery HTML selector).

Potential use scenarios include:
- enrichment of a library catalogue website - beside being able to read the item (e.g. a book) description, you also get links to digitized copies of this item or items created by the same author
- enrichment of a heritage-related blog - you easily can provide links to materials related to each blog post (we also made [a WordPress plugin for that](https://github.com/psnc-dl/wp-chcontext/wiki/CHContext-WordPress-Plugin-Description)!)

The plugin supports three data sources:
- [Europeana](http://europeana.eu/) (with API key)
- [Digital Public Library of America](http://dp.la/) (with API key)
- [Polish Digital Libraries Federation](http://fbc.pionier.net.pl/) (without API key)

There is also possibility to define your own data provider(s). The widget look is customizable via CSS.

## Acknowledgments
The widget is developed by [Digital Libraries Team](http://dl.psnc.pl/) of [Poznań Supercomputing and Networking Center](http://www.man.poznan.pl/).

**Feel free [to contact us](http://dl.psnc.pl/contact/) in case of any questions.**

This project was initiated and partially funded as a part of the [Europeana Awareness](http://pro.europeana.eu/web/europeana-awareness) project, financed under the ICT Policy Support Programme (ICT PSP) as part of the Competitiveness and Innovation Framework Programme by the European Community.

## Licence
Copyright (c) 2013 Poznań Supercomputing and Networking Center  
Licensed under the EUPL, Version 1.1 or – as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence"). 

[The full licence text](LICENCE).

## How to use it

### 1. Install the widget

1. Add chcontext to your project
 * We recommend you to use JsDelivr CDN files: 

 ````html
 <script type="text/javascript" src="http://cdn.jsdelivr.net/chcontext/1.2.0/chcontext.min.js"></script>
 ````
 * or download [chcontext.min.js](http://cdn.jsdelivr.net/chcontext/1.2.0/chcontext.min.js), add it to your project and include it in your html using appropriate path.

 ````html
 <script type="text/javascript" src="$PATH/chcontext.min.js"></script>
 ````

 Development minified and unminified versions can be found [here](dist/): 

2.  Put `div` element in place where you want the widget to appear. It has to have `class="chcontext-widget-wrapper"` parameter. Please read [how to configure the widget](#2-configure-the-widget). 

 ````html
 <div id="widget1" class="chcontext-widget-wrapper" data-searchProvider="FBC+" data-queryselector="h1">
 </div>
 ````

### 2. Configure the widget

Widget main `div` tag can have the following configuration parameters:

* `data-searchProvider` - Name of search provider. Possible values:
  * `FBC+` - [Digital Libraries Federation](http://beta.fbc.pionier.net.pl/)
  * `DPLA` - [Digital Public Library of America](http://dp.la/)
  * `EUROPEANA` - [Europeana](http://europeana.eu/)
* `data-customSearchProvider` - Name of custom search provider. [Read how to define custom search provider](#custom-search-provider). 
* `data-query` - defines the query 
* `data-queryselector` - defines which DOM element text will be used to build the query. Elements have to be indicated by [jQuery selector](http://api.jquery.com/category/selectors/). [Here](http://www.w3schools.com/jquery/jquery_selectors.asp) you can find some examples. 
* `data-iframe-selector` - can be used to run query selection inside of an iframe. An iframe have to be indicated by jQuery selector. This parameter must be used together with `data-queryselector`. Be aware of that you can select query from inside of an iframe if the iframe is on the same domain as main page. See [working example](http://psnc-dl.github.io/chcontext/example/example2.html). 
* `data-locale` - Language code which indicates the language of widget labels. If the property is not defined widget tries to use language indicated by user browser. Currently English and Polish are supported by default and English is the default language. Custom language can be also used (please read [Custom Language section](#custom-language)).
* `data-resultCount` - Maximum number of results to be displayed. Default value is 5.
* `data-apikey` - API key. Required to access results from [Europeana](http://europeana.eu/portal/api/registration.html) or [DPLA](http://dp.la/info/developers/codex/policies/#get-a-key).
* `data-show-img` - Whether images should be displayed next to the results.
* `data-show-date` - Whether date should be displayed next to the results (right now available only for FBC+ provider)
* `data-init-disabled` - (optional) disable running search on page load.
**Notice:**
* One of `data-searchProvider` or `data-customSearchProvider` parameters has to be defined. If both are defined widget uses data-customSearchProvider.
* One of `data-query` or `data-queryselector` parameters has to be defined. Please read [how the queries are built](#building-queries) if both are parameters are defined.
* The `class` parameter indicates that current html element will wrap widget html code. Default value is `chcontext-widget-wrapper` and it should not be overrided.

#### Building queries
* Query is build by concatenation of `data-query` text and value indicated by `data-queryselector`. 
 * if `data-query="painting"` and  `data-queryselector="h1"` where `h1` DOM element text is `Monet` then the resulting query is `painting Monet`. 
 * try out [working example (#4)](http://psnc-dl.github.io/chcontext/example/example1.html). 
* It is also possible to build more complex queries by using value indicated by `data-queryselector` inside of the query defined in `data-query`. You should define `data-queryselector` and type `$$` inside of `data-query` text, in place where you want the value of `data-queryselector` to appear.
 * if `data-query="painting AND creator:$$` and  `data-queryselector="h1"` where `h1` DOM element text is `Monet` then the resulting query is `painting AND creator:Monet`.
 * try out [working example (#3)](http://psnc-dl.github.io/chcontext/example/example1.html). 

## Customize

### Style the widget

You can change the look of the widget using CSS. First check [the default style](src/style.css) to find out what classes you should use. Then use inline styling in `div` element:
````html
 <div id="widget1" class="chcontext-widget-wrapper" ... style="width:100px; height:200px">
 </div>
````
or include separate css file. Try out [working example](http://psnc-dl.github.io/chcontext/example/example1.html). 


### Add new language 
Currently only English and Polish are supported. To use widget with other language you have to 

* Define JavaScript map containing labels in your language. This map should be defined in separate JS file or inside of `<script type="text/javascript">` tag.
```JS
    var PSNC = PSNC || {};
    PSNC.chcontext = PSNC.chcontext || {};
    PSNC.chcontext.your_map_name = {
    "seeMore" : "your text for see more results",
    "poweredBy" : "yout text for powered by",
    "titleLabel" : "your text for title",
    "authorLabel" : "your text for author",
    "dateLabel" : "your text for date"
    };
```
**First two lines shoud not be removed!** You have to define 4 labels: `seeMore`,`poweredBy`,`titleLabel`,`authorLabel`. If label is not defined, label in default language is used instead.

* Define `data-locale` parameter. It should be equal to `your_language_name` from the JS code.
* You can try out [working example](http://psnc-dl.github.io/chcontext/example/example1.html) 

### Add custom search provider 
* Define JavaScript object with your implentation of `search` function. 
* `search` function should return results object. Structure of this object can be found [here](test/data.json).
* Define `data-customSearchProvider` parameter. It should conatain the name of your search provider object.

Try out [working example](http://psnc-dl.github.io/chcontext/example/exampleCustomSearchProvider.html) 


###Refresh search results on demand
The default behaviour is to run search when jQuery `$( document ).ready()` event occurs. It is also possible to manually call the search action. To do so please use `PSNC.chcsearch.refresh` method. You shoud pass jQuery object pointing to the widget you wish to refresh as an argument. 

Try out [working example](http://psnc-dl.github.io/chcontext/example/example3.html) 

In this example search for query=`picture` is run on page load. You can rerun search with different query string by typing it into input box and clicking `Refresh!` button. 
JavaScript code changes the `data-query` attribute of widget `div` element and then calls `PSNC.chcsearch.refresh` method.


You can also disable running search on page load by setting `data-init-disabled` to `true` and calling `PSNC.chcsearch.refresh` method manually instead.

##Sites Using the Widget

<!-- * http://gkchesterton.pl/ - site about life of Gilbert Keith Chesterton-->

[Check out](https://github.com/psnc-dl/wp-chcontext/wiki/Sites-Using-the-Widget) sites using [WP-CHContext](https://github.com/psnc-dl/wp-chcontext) (our widget as a Wordpress plugin).

[Let us know](http://dl.psnc.pl/contact/) if you are using the widget :)

## Release notes

### 1.2.0
* Added method allowing to refresh results on demand. 
* Added option to disable running search on page load. 
* Introduced unit tests. 
* Updated CSS styles - size of an image on the results list should no longer be overrided by other styles. 

### 1.1.0
* Query can be parameterized with `$$`, which will be replaced by text indicated by a query selector. 

### 1.0.0
* Initial release. 
