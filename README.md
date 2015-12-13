# z-index-sass

SASS / SCSS helper to handle lots of z-indices in big applications.

## Installation

Install with bower:

```sh
bower install z-index-sass --save
```

or just copy the file from lib/z-index.sass.

Then just import the file (you can find it in bower_components folder if installed with bower):

```SCSS
@import "/path/to/lib/z-index";
```

## Why

Sometimes in big projects it's hard to manage all z-index values across different pages, partials and libraries with a team of many developers. Typical example could be making a custom popup and a dropbox: in both cases developer most likely gives them the highest z-index possible to make them be rendered above the page content, but he also needs to resolve them against each other.

What this library does is giving an ability to set up all z-indices together in one file and then use them across the app; it makes you sure in anything you do with z-indices.

It provides a **native ordering**, **automatically generates z-index values** (meanwhile it is flexible enough to let you specify **custom z-index values**) and has **validations** on the compilation level.

This gives developers a flexible tool and meanwhile protects them from making mistakes.

## How to use

First you need to initialize the z-index array, then simply use it in **every place** you specify a z-index.

### Example

Create a separate file in your project (e.g. my-z-indices.scss) where you initialize / collect all z-index values. There e.g. you can use the following:

```SCSS
@import "path/to/lib/z-index"; // imports THIS library

@include z-index-init(
  page-header // creates page-header=1
  (customSelect customSelectDropbox) // creates customSelect=2 and customSelectDropbox=2
  (externalLibraryPopup: 1000) // creates externalLibraryPopup=1000
  myPopup // creates myPopup=1001
  super-element // creates super-element=1002
);
```

As you can see you can choose from a variety of naming notations.

**Important**: you need to use SCSS extension for this file. SASS does not allow new lines so the ordering would be a mess in this case. Luckily you can import SCSS files in your SASS files as easy as SASS files.

Then include this file where you want to use it and... use it!

```SCSS
@import "path/to/my-z-indices";

.popup {
  @include z-index(myPopup);
}
```

That will generate

```CSS
.popup {
  z-index: 1001;
}
```

### Initialize first

```SCSS
@include z-index-init(settingsList[, startFrom]);
```

Where `settingsList` is a list of `zIndexItem`. zIndexItems are generated in the order you provide, `startFrom` is an optional attribute with a default value `1` to specify z-index for the first array item.

`zIndexItem` is one of the following:
- just a variable name
- a list of variables which will get the same z-index (one-level elements)
- a map of 1 key-value entry, key is a variable name, value is a custom z-index to be used with this variable name. This is helpful when you need to work with some library which already has some z-index value you need to take into account. Just register a variable for that library and all the zIndexItems specified after will be generated with a bigger value. Use it only when it is really necessary, it should be exception but not the rule.

### Use z-index

The usage is as simple as

```SCSS
@include z-index(variable-name);
```
