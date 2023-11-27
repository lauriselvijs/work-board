import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import geoMap from "./gz_2010_us_040_00_500k.json";
import geoMap from "./2_hoch.geo.json";

import { useState } from "react";

const Map = () => {
    const [selectedStates, setSelectedStates] = useState<string[]>([]);

    const handleClick = (geo: any) => () => {
        // console.log(geo);

        if (selectedStates.includes(geo.properties.name)) {
            const filteredStates = selectedStates.filter(
                (state) => state !== geo.properties.name
            );
            setSelectedStates(filteredStates);
        } else {
            setSelectedStates((prev) => [...prev, geo.properties.name]);
        }
    };

    return (
        <div className="w-full h-full">
            <ComposableMap
                style={{ backgroundColor: "gray" }}
                projection="geoAlbers"
                projectionConfig={{
                    rotate: [0, 0, 0],
                    center: [10, 51],
                    scale: 4000,
                }}
            >
                <Geographies geography={geoMap}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                onClick={handleClick(geo)}
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: {
                                        fill: selectedStates.includes(
                                            geo.properties.name
                                        )
                                            ? "yellow"
                                            : "white",
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: selectedStates.includes(
                                            geo.properties.name
                                        )
                                            ? "yellow"
                                            : "red",
                                        outline: "none",
                                    },
                                    pressed: {
                                        fill: selectedStates.includes(
                                            geo.properties.name
                                        )
                                            ? "yellow"
                                            : "white",
                                        outline: "none",
                                    },
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
};

export default Map;
