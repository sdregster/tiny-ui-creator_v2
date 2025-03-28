
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { objectTypes } from "@/data/mock-data";
import { ObjectType } from "@/types/object-types";

interface ObjectTypeSelectorProps {
  onSelectType: (type: ObjectType) => void;
}

const ObjectTypeSelector = ({ onSelectType }: ObjectTypeSelectorProps) => {
  return (
    <div className="flex flex-col space-y-6 p-4">
      <h2 className="text-2xl font-semibold text-center">Выберите тип объекта</h2>
      <div className="grid grid-cols-1 gap-4">
        {objectTypes.map((type) => (
          <Card 
            key={type.id} 
            className="cursor-pointer hover:bg-secondary/20 transition-colors"
            onClick={() => onSelectType(type)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-base">{type.label}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">Количество: {type.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObjectTypeSelector;
