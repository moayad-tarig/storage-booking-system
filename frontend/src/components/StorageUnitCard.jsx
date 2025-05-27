"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin } from "lucide-react"

const StorageUnitCard = ({ unit }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-primary-500" />
            <CardTitle className="text-lg">{unit.name}</CardTitle>
          </div>
          <Badge 
            variant={unit.isAvailable ? "default" : "secondary"}
            className={unit.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {unit.isAvailable ? "Available" : "Occupied"}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          {unit.location}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Size</p>
            <p className="font-medium">{unit.size}</p>
          </div>

          <div className="text-2xl font-bold text-primary-600">
            ${unit.pricePerDay}
            <span className="text-sm font-normal text-gray-600">/day</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/book?unitId=${unit.id}`} className="w-full">
          <Button
            className="w-full bg-primary-500 hover:bg-primary-600 text-white"
            disabled={!unit.isAvailable}
          >
            {unit.isAvailable ? "Book Now" : "Not Available"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default StorageUnitCard
