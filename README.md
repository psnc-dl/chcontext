# CHContext

Web widget for searching objects of cultural heritage. 

## How to use it

1. Add chcontext to your project
 * We recommend you to use JsDelivr CDN files: 

 ````html
 <!-- Use LATEST folder to always get the latest version-->
 <script type="text/javascript" src="http://cdn.jsdelivr.net/chcontext/latest/chcontext.min.js"></script>
 
 <!-- Or use TAG number for specific version -->
 <script type="text/javascript" src="http://cdn.jsdelivr.net/chcontext/1.0/chcontext.min.js"></script>
 ````
 * or download [`chcontext.min.js`](/dist/chcontext.min.js), add it to your project and include it in your html using appropriate path.

 ````html
 <script type="text/javascript" src="$PATH/chcontext.min.js"></script>
 ````

1.  Put `div` element in place where you want the widget to appear. It has to have `class="chcontext-widget-wrapper"` parameter. Please read [parameters section](#parameters) to configure the widget. 

 ````html
 <div id="widget1" class="chcontext-widget-wrapper" data-searchProvider="FBC+" data-queryselector="h1">
 </div>
 ````
 
### Style your widget 
You can change the look of the widget using CSS. First check [the default style](src/style.css) to find out what classes you should use. Then use inline styling in `div` element:
````html
 <div id="widget1" class="chcontext-widget-wrapper" ... style="width:100px; height:200px">
 </div>
````
or include separate css file. Try out [working example](example/example1.html). (Please use [GitHub HTML Preview](http://htmlpreview.github.io/) to render this HTML.)

## Parameters
* `class` - Indicates that current html element will wrap widget html code. Default value is `chcontext-widget-wrapper` and it should not be overrided.
* `data-searchProvider` - Name of search provider. Possible values:
  * `FBC+` - [Digital Libraries Federation](http://beta.fbc.pionier.net.pl/)
  * `DPLA` - [Digital Public Library of America](http://dp.la/)
  * `EUROPEANA` - [Europeana](http://europeana.eu/)
* `data-customSearchProvider` - Name of custom search provider. [Read how to define custom search provider](#custom-search-provider). 

**One of `data-searchProvider` or `data-customSearchProvider` parameters has to be defined. If both are defined widget uses data-customSearchProvider.**
* `data-query` - defines the query 
* `data-queryselector` - defines which DOM element text will be used to build the query. Elements have to be indicated by [jQuery selector](http://api.jquery.com/category/selectors/). [Here](http://www.w3schools.com/jquery/jquery_selectors.asp) you can find some examples. 
* `data-iframe-selector` - see [working example](example/example2.html). `data-queryselector` should also be defined. ...

**One of `data-query` or `data-queryselector` parameters has to be defined. If both are defined query is build from selector value cantatenated with `data-query`.**
* `data-locale` - Language code which indicates the language of widget labels. If the property is not defined widget tries to use language indicated by user browser. Currently English and Polish are supported by default and English is the default language. Custom language can be also used (please read [Custom Language section](#custom-language)).
* `data-resultCount` - Maximum number of results to be displayed. Default value is 5.
* `data-apikey` - API key. Required to access results from [Europeana](http://europeana.eu/portal/api/registration.html) or [DPLA](http://dp.la/info/developers/codex/policies/#get-a-key).
* `data-show-img` - Whether images should be displayed next to the results.

## Custom language
Currently only English and Polish are supported. To use widget with other language you have to 

* Define JavaScript map containing labels in your language. This map should be defined in separate JS file or inside of `<script type="text/javascript">` tag.
```JS
    var PSNC = PSNC || {};
    PSNC.chcontext = PSNC.chcontext || {};
    PSNC.chcontext.your_map_name = {
    "seeMore" : "your text for see more results",
    "poweredBy" : "yout text for powered by",
    "titleLabel" : "your text for title",
    "authorLabel" : "your text for author"
    };
```
**First two lines shoud not be removed!** You have to define 4 labels: `seeMore`,`poweredBy`,`titleLabel`,`authorLabel`. If label is not defined, label in default language is used instead.

* Define `data-locale` parameter. It should be equal to `your_language_name` from the JS code.
* You can try out [working example](example/example1.html). (Please use [GitHub HTML Preview](http://htmlpreview.github.io/) to render this HTML.)

##Custom search provider
* Define JavaScript object with your implentation of `search` function. 
* `search` function should return results object. Structure of this object can be found [here](test/data.json).
* Define `data-customSearchProvider` parameter. It should conatain the name of your search provider object.

Try out [working example](example/exampleCustomSearchProvider.html). (Please use [GitHub HTML Preview](http://htmlpreview.github.io/) to render this HTML.)


## License
Copyright (c) 2013 Poznań Supercomputing and Networking Center  
Licensed under the EUPL, Version 1.1 or – as soon they will be approved by the European Commission - subsequent versions of the EUPL (the "Licence"). 

[The full licence text](LICENCE).
