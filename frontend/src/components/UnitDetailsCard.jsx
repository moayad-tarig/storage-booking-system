"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Calendar } from "lucide-react";

const UnitDetailsCard = ({ unit }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-primary-500" />
            <CardTitle className="text-xl">{unit.name}</CardTitle>
          </div>
          <Badge 
            variant={unit.isAvailable ? "default" : "secondary"}
            className={unit.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {unit.isAvailable ? "Available" : "Occupied"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{unit.location}</span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Size</h3>
            <p className="text-lg">{unit.size}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Price</h3>
            <p className="text-2xl font-bold text-primary-600">
              ${unit.pricePerDay}
              <span className="text-sm font-normal text-gray-600">/day</span>
            </p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Booking Details</h3>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Select your dates in the form</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitDetailsCard;
