# dn_vectorbasemap-localizer

This bundle changes the localization of vector tile layers to the currently selected locale.

## Usage

Simply add the bundle "dn_vectorbasemap-localizer" to your app.

## Configuration Reference

``` json
"dn_vectorbasemap-localizer": {
    "Config": {
        "supportedLocale": [
                    "en",
                    "de"
        ],
        "fallbackLocale": "en",
        "localizableLayoutProperties": [
            {
                "key": "text-field",
                "values": [
                    "{_name_global}",
                    "{_name}",
                    "{_name_en}",
                    "{_name_de}"
                ],
                "replacingValue": "{_name_{locale}}"
            }
        ],
        "waitAfterLayerviewCreateInMS": 1500
    }
}
```
