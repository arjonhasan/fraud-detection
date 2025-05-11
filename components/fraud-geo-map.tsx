"use client"

import * as React from "react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RefreshCw } from "lucide-react"

// World map data
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

// Fraud data by country
const countryData = [
  { country: "USA", id: "USA", fraudCount: 1245, amount: 245000 },
  { country: "Canada", id: "CAN", fraudCount: 420, amount: 84000 },
  { country: "United Kingdom", id: "GBR", fraudCount: 890, amount: 178000 },
  { country: "France", id: "FRA", fraudCount: 560, amount: 112000 },
  { country: "Germany", id: "DEU", fraudCount: 680, amount: 136000 },
  { country: "Spain", id: "ESP", fraudCount: 320, amount: 64000 },
  { country: "Italy", id: "ITA", fraudCount: 450, amount: 90000 },
  { country: "China", id: "CHN", fraudCount: 760, amount: 152000 },
  { country: "Japan", id: "JPN", fraudCount: 380, amount: 76000 },
  { country: "Australia", id: "AUS", fraudCount: 175, amount: 35000 },
  { country: "Brazil", id: "BRA", fraudCount: 320, amount: 64000 },
  { country: "India", id: "IND", fraudCount: 580, amount: 116000 },
  { country: "Russia", id: "RUS", fraudCount: 420, amount: 84000 },
  { country: "South Africa", id: "ZAF", fraudCount: 280, amount: 56000 },
  { country: "Mexico", id: "MEX", fraudCount: 210, amount: 42000 },
  { country: "Argentina", id: "ARG", fraudCount: 180, amount: 36000 },
  { country: "Egypt", id: "EGY", fraudCount: 150, amount: 30000 },
  { country: "Saudi Arabia", id: "SAU", fraudCount: 220, amount: 44000 },
  { country: "Nigeria", id: "NGA", fraudCount: 190, amount: 38000 },
  { country: "Indonesia", id: "IDN", fraudCount: 240, amount: 48000 },
  { country: "Pakistan", id: "PAK", fraudCount: 170, amount: 34000 },
  { country: "Turkey", id: "TUR", fraudCount: 290, amount: 58000 },
  { country: "South Korea", id: "KOR", fraudCount: 310, amount: 62000 },
  { country: "Thailand", id: "THA", fraudCount: 200, amount: 40000 },
  { country: "Vietnam", id: "VNM", fraudCount: 160, amount: 32000 },
]

// Fraud hotspots (cities with high fraud)
const hotspots = [
  { name: "New York", coordinates: [-74.006, 40.7128], fraudCount: 320, radius: 8 },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522], fraudCount: 280, radius: 7 },
  { name: "London", coordinates: [-0.1278, 51.5074], fraudCount: 260, radius: 7 },
  { name: "Paris", coordinates: [2.3522, 48.8566], fraudCount: 210, radius: 6 },
  { name: "Tokyo", coordinates: [139.6917, 35.6895], fraudCount: 190, radius: 6 },
  { name: "Shanghai", coordinates: [121.4737, 31.2304], fraudCount: 230, radius: 6 },
  { name: "Mumbai", coordinates: [72.8777, 19.076], fraudCount: 180, radius: 5 },
  { name: "Sydney", coordinates: [151.2093, -33.8688], fraudCount: 120, radius: 5 },
  { name: "São Paulo", coordinates: [-46.6333, -23.5505], fraudCount: 150, radius: 5 },
  { name: "Moscow", coordinates: [37.6173, 55.7558], fraudCount: 170, radius: 5 },
  { name: "Berlin", coordinates: [13.405, 52.52], fraudCount: 140, radius: 5 },
  { name: "Mexico City", coordinates: [-99.1332, 19.4326], fraudCount: 160, radius: 5 },
  { name: "Cairo", coordinates: [31.2357, 30.0444], fraudCount: 130, radius: 4 },
  { name: "Lagos", coordinates: [3.3792, 6.5244], fraudCount: 150, radius: 5 },
  { name: "Dubai", coordinates: [55.2708, 25.2048], fraudCount: 180, radius: 5 },
  { name: "Singapore", coordinates: [103.8198, 1.3521], fraudCount: 110, radius: 4 },
  { name: "Toronto", coordinates: [-79.3832, 43.6532], fraudCount: 130, radius: 4 },
  { name: "Hong Kong", coordinates: [114.1694, 22.3193], fraudCount: 200, radius: 6 },
  { name: "Bangkok", coordinates: [100.5018, 13.7563], fraudCount: 140, radius: 5 },
  { name: "Rio de Janeiro", coordinates: [-43.1729, -22.9068], fraudCount: 120, radius: 4 },
]

export function FraudGeoMap() {
  const [position, setPosition] = React.useState({ coordinates: [0, 0], zoom: 1 })
  const [tooltipContent, setTooltipContent] = React.useState("")
  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = React.useState(false)
  const [mapView, setMapView] = React.useState("heatmap")
  const mapContainerRef = React.useRef(null)

  // Create a color scale for the heatmap
  const maxFraud = Math.max(...countryData.map((d) => d.fraudCount))
  const colorScale = scaleLinear<string>()
    .domain([0, maxFraud / 3, (maxFraud * 2) / 3, maxFraud])
    .range(["#f7fbff", "#6baed6", "#3182bd", "#08519c"])

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }))
  }

  const handleMoveEnd = (position) => {
    setPosition(position)
  }

  const handleCountryHover = (geo, current) => {
    const countryInfo = countryData.find((d) => d.id === geo.id)
    if (countryInfo) {
      setTooltipContent(`
        <strong>${countryInfo.country}</strong><br/>
        Fraud Count: ${countryInfo.fraudCount}<br/>
        Amount: $${countryInfo.amount.toLocaleString()}
      `)
      setShowTooltip(true)
    } else {
      setTooltipContent("")
      setShowTooltip(false)
    }
  }

  const handleHotspotHover = (hotspot, e) => {
    setTooltipContent(`
      <strong>${hotspot.name}</strong><br/>
      Fraud Count: ${hotspot.fraudCount}
    `)
    setShowTooltip(true)
  }

  const handleMouseMove = (e) => {
    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect()
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  // Get country color based on fraud count
  const getCountryColor = (geo) => {
    if (mapView !== "heatmap") return "#D6D6DA"

    const countryInfo = countryData.find((d) => d.id === geo.id)
    if (!countryInfo) return "#D6D6DA"

    return colorScale(countryInfo.fraudCount)
  }

  return (
    <div
      className="relative h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={mapContainerRef}
    >
      <Tabs value={mapView} onValueChange={setMapView} className="mb-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
            <TabsTrigger value="hotspots">Fraud Hotspots</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setPosition({ coordinates: [0, 0], zoom: 1 })}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Tabs>

      <div className="h-[500px] overflow-hidden rounded-lg border">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 150,
          }}
        >
          <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => handleCountryHover(geo, null)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: getCountryColor(geo),
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.25,
                        },
                        hover: {
                          fill: "#A9D8F8",
                          outline: "none",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                        },
                        pressed: {
                          fill: "#3182CE",
                          outline: "none",
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {mapView === "hotspots" &&
              hotspots.map(({ name, coordinates, fraudCount, radius }) => (
                <Marker
                  key={name}
                  coordinates={coordinates}
                  onMouseEnter={(e) => handleHotspotHover({ name, fraudCount }, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <circle r={radius} fill="#F53" fillOpacity={0.8} stroke="#FFF" strokeWidth={0.5} />
                </Marker>
              ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {showTooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-md bg-background p-2 text-xs shadow-md"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 40,
            maxWidth: "200px",
          }}
          dangerouslySetInnerHTML={{ __html: tooltipContent }}
        />
      )}

      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#f7fbff" }} />
                <span className="text-xs">Low</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#6baed6" }} />
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#08519c" }} />
                <span className="text-xs">High</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Total Countries: {countryData.length} | Total Hotspots: {hotspots.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
