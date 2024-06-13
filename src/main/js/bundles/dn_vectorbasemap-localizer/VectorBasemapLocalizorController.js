/*
 * Copyright (C) 2023 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import declare from "dojo/_base/declare";
import * as reactiveUtils from "esri/core/reactiveUtils";

export default declare([], {

    activate: function() {
        var mapID = this.basemapsModel.selectedId;
        this.localizeBasemap(mapID);
        reactiveUtils.watch(
            () => this.basemapsModel.selectedId,
            (event)=> {
                this.localizeBasemap(event.value);
        })
    },
    localizeBasemap(mapID){
        const basemapItem = this.basemapsModel.findItemById(mapID);
        if (basemapItem) {
            const baseLayers = basemapItem?.basemap?.baseLayers?.items;
            if(baseLayers)
            {
                let locale = this._i18n.get().locale;
                const supportedLocale = this._properties.supportedLocale;
                const fallbackLocale = this._properties.fallbackLocale;
                const localizableLayoutProperties = this._properties.localizableLayoutProperties;
                if(supportedLocale.indexOf(locale) == -1)
                {
                    //fallback locale
                    locale = fallbackLocale;
                }
                const waitAfterLayerviewCreateInMS = this._properties.waitAfterLayerviewCreateInMS
                baseLayers.forEach(bLayer => {
                    if(bLayer.type == "vector-tile"){
                        bLayer.on("layerview-create", () => {
                            setTimeout(() => {
                                localizableLayoutProperties.forEach(localizationConfigItem => {
                                    const key = localizationConfigItem.key;
                                    const values = localizationConfigItem.values;
                                    const replacingValue =
                                        localizationConfigItem.replacingValue.replace("{locale}", locale);
                                    const localizableLayers = bLayer.currentStyleInfo.style.layers.
                                        filter(l => l.layout && l.layout[key] && values.indexOf(l.layout[key]) > -1);
                                    localizableLayers.forEach(layer => {
                                        const layoutProperties = bLayer.getLayoutProperties(layer.id);
                                        layoutProperties[key] = replacingValue;
                                        bLayer.setLayoutProperties(layer.id, layoutProperties);
                                    })
                                })
                            }, waitAfterLayerviewCreateInMS);
                        })
                    }
                })
            }
        }
    }
});
