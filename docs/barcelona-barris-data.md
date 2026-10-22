# Barcelona barri search centers

`src/features/discover-cafes/data/barcelona-barris.ts` contains all 73 official Barcelona barris. `id` preserves the source's two-digit `BARRI` administrative code and `name` preserves its Catalan `NOM`, including articles, accents, apostrophes, and hyphens. Entries are ordered by displayed name using `Intl.Collator("ca")`.

## Source and attribution

Source: **Ajuntament de Barcelona — Unidades administrativas de la ciudad de Barcelona**, accessed 22 October 2026. The [official OpenData catalogue](https://opendata-ajuntament.barcelona.cat/data/ca/dataset/20170706-districtes-barris) is mirrored by the [Spanish government catalogue](https://datos.gob.es/es/catalogo/l01080193-unidades-administrativas-de-la-ciudad-de-barcelona), which identifies the municipality as publisher and lists the GeoJSON distribution with a [Creative Commons Attribution 4.0 licence](https://creativecommons.org/licenses/by/4.0/).

The [downloaded GeoJSON distribution](https://opendata-ajuntament.barcelona.cat/data/dataset/808daafa-d9ce-48c0-925a-fa5afdb1ed41/resource/cd800462-f326-429f-a67a-c69b7fc4c50a/download) is a ZIP containing `0301100100_UNITATS_ADM_POLIGONS.json` and a separate points file. This implementation derives centers from the polygons rather than the cartographic label points. The downloaded ZIP has SHA-256 `96fd6b591e17e537bdaf3dc97bbfd9c1aef1bedcbbe871942cbd2c7f8746e96a`.

Changes made for Lattely: select the barrio records and their names/codes, derive approximate central coordinates, convert those coordinates to WGS84, round them, and alphabetize the resulting compact dataset. The local data is bundled; the application makes no runtime requests to the municipality.

## Derivation and verification

1. From the polygons FeatureCollection, select features whose `properties.TIPUS_UA` is `BARRI`: exactly 73 records, with the complete unique code range `01`–`73` and 73 unique names.
2. Compute an area-weighted polygon centroid in the source's declared **EPSG:25831** projected coordinate system using the shoelace formula. For multipolygons, weight every exterior ring by its area and subtract holes. Working in projected meters avoids treating longitude/latitude degrees as equal-area coordinates.
3. Verify each centroid lies inside its source polygon, excluding holes. All 73 centroids pass; no representative-point fallback is needed.
4. Convert each centroid with PROJ `cs2cs -f %.8f EPSG:25831 +to OGC:CRS84`, then round longitude and latitude to six decimal places. Transform the rounded coordinates back to EPSG:25831 and verify that all 73 still lie inside their source polygons. The precision is a storage choice; it does not imply that these are authoritative neighborhood destinations.
5. Cross-check every code/name pair against the municipality's [GeoBCN barrio collection](https://geoportal.barcelona.cat/geobcn/serveis/territori/barris/) ([API documentation](https://geoportal.barcelona.cat/geoBCN/doc/rest/API.aspx)): all 73 match exactly. The administrative polygon distribution is the source for the bundled coordinates.

The resulting anchors span latitude **41.339081–41.463457** and longitude **2.089461–2.216814**. Every anchor is within the existing approximate demo coverage box (south 41.32, north 41.47, west 2.05, east 2.23), so this ticket does not require changing that box. This checks the selectable search anchors, not containment of every municipal polygon or the municipal boundary itself.

These are geometric central points for straight-line radius searches. They are not café locations, population-weighted centers, navigation destinations, or boundary filters. Selecting a barri can include cafés in adjacent barris, and some centers can have no nearby fictional cafés.
