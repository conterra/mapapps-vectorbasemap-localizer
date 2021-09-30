# Vector Basemap Localizer

This bundle changes the localization of vector tile layers to the currently selected locale.

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_vectorbasemaplocalizer/index.html

## Installation Guide

Simply add the bundle "dn_vectorbasemap-localizer" to your app.

[dn_vectorbasemap-localizer Documentation](https://github.com/conterra/mapapps-vectorbasemap-localizer/tree/master/src/main/js/bundles/dn_vectorbasemap-localizer)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
