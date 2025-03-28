
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Parameter, SystemObject } from "@/types/object-types";
import { parametersByType, systemObjects } from "@/data/mock-data";
import { Card } from "@/components/ui/card";

interface ParameterSelectorProps {
  objectType: string;
  selectedParameters: Parameter[];
  onSelectParameters: (parameters: Parameter[]) => void;
  onSelectObject: (object: SystemObject) => void;
  onObjectsFiltered?: (count: number) => void;
}

const ParameterSelector = ({ 
  objectType, 
  selectedParameters, 
  onSelectParameters, 
  onSelectObject,
  onObjectsFiltered 
}: ParameterSelectorProps) => {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<SystemObject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userValues, setUserValues] = useState<Record<string, string>>({});
  const [noMatchMessage, setNoMatchMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const typeParams = parametersByType[objectType] || [];
    setParameters(typeParams);
    
    // Filter system objects by type
    const objects = systemObjects.filter(obj => obj.type === objectType);
    setFilteredObjects(objects);
    
    // Notify parent about the initial count of filtered objects
    if (onObjectsFiltered) {
      onObjectsFiltered(objects.length);
    }
  }, [objectType, onObjectsFiltered]);

  // Helper function to check if a value is within a range
  const isValueInRange = (range: string, value: number): boolean => {
    if (!range.includes('-')) return false;
    
    const [minStr, maxStr] = range.split('-').map(v => v.trim());
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);
    
    return !isNaN(min) && !isNaN(max) && value >= min && value <= max;
  };

  const toggleParameter = (parameter: Parameter) => {
    const isSelected = selectedParameters.some(p => p.id === parameter.id);
    let newSelectedParameters;
    
    if (isSelected) {
      newSelectedParameters = selectedParameters.filter(p => p.id !== parameter.id);
      
      // Remove user value when deselecting a parameter
      const newUserValues = { ...userValues };
      delete newUserValues[parameter.id];
      setUserValues(newUserValues);
    } else {
      newSelectedParameters = [...selectedParameters, parameter];
      
      // Set default user value when selecting a parameter
      setUserValues(prev => ({
        ...prev,
        [parameter.id]: parameter.value.toString()
      }));
    }
    
    onSelectParameters(newSelectedParameters);
    filterObjectsByUserCriteria(newSelectedParameters, isSelected ? { ...userValues, [parameter.id]: undefined } : userValues);
  };

  const handleUserValueChange = (parameterId: string, value: string) => {
    const newUserValues = {
      ...userValues,
      [parameterId]: value
    };
    setUserValues(newUserValues);
    filterObjectsByUserCriteria(selectedParameters, newUserValues);
  };

  const filterObjectsByUserCriteria = (params: Parameter[], values: Record<string, string | undefined>) => {
    if (params.length === 0) {
      // If no parameters selected, show all objects of this type
      const objects = systemObjects.filter(obj => obj.type === objectType);
      setFilteredObjects(objects);
      setNoMatchMessage(null);
      
      // Notify parent component about filtered objects count
      if (onObjectsFiltered) {
        onObjectsFiltered(objects.length);
      }
      return;
    }

    const filteredObjs = systemObjects.filter(obj => {
      if (obj.type !== objectType) return false;
      
      // Check if the object matches all selected parameter criteria
      return params.every(param => {
        const userValue = values[param.id];
        if (!userValue) return true; // If no user value set, don't filter on this parameter
        
        const objCharacteristic = obj.characteristics?.find(c => c.id === param.id);
        if (!objCharacteristic) return false;
        
        const objValueStr = objCharacteristic.value.toString();
        const userValueNum = parseFloat(userValue);
        
        // Handle range values (like "0.5 - 0.9")
        if (objValueStr.includes('-')) {
          // If object value is a range, check if user value is within that range
          return !isNaN(userValueNum) && isValueInRange(objValueStr, userValueNum);
        } else if (!isNaN(userValueNum)) {
          // For non-range numeric values in the object
          const objValueNum = parseFloat(objValueStr);
          
          if (!isNaN(objValueNum)) {
            // For object parameter value, check if user input is within 10% tolerance
            const tolerance = objValueNum * 0.1;
            return Math.abs(objValueNum - userValueNum) <= tolerance;
          }
        }
        
        // For string values or if numeric comparison failed, do direct comparison
        return objValueStr === userValue;
      });
    });

    setFilteredObjects(filteredObjs);
    
    // Set message if no matches found
    if (filteredObjs.length === 0) {
      setNoMatchMessage("По заданным критериям аналогов не найдено. Попробуйте изменить параметры.");
    } else {
      setNoMatchMessage(null);
    }
    
    // Notify parent component about filtered objects count
    if (onObjectsFiltered) {
      onObjectsFiltered(filteredObjs.length);
    }
    
    // If exactly one object matches, automatically select it
    if (filteredObjs.length === 1) {
      onSelectObject(filteredObjs[0]);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setParameters(parametersByType[objectType] || []);
      return;
    }
    
    const filtered = (parametersByType[objectType] || []).filter(param => 
      param.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setParameters(filtered);
  };

  const isSelected = (parameter: Parameter) => {
    return selectedParameters.some(p => p.id === parameter.id);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Left panel - Parameter selection */}
      <div className="flex-1 bg-white rounded-md shadow border">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Выберите ТЭП:</h3>
          <div className="flex items-center space-x-2 mb-4">
            <Input 
              placeholder="Наименование ТЭП"
              className="w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="icon" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-2">
            <h4 className="font-medium mb-2">Результаты поиска:</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ТЭП</TableHead>
                  <TableHead>Значение</TableHead>
                  <TableHead className="w-10">Ключевой показатель</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parameters.map((parameter) => (
                  <TableRow key={parameter.id}>
                    <TableCell className="font-medium">{parameter.name}</TableCell>
                    <TableCell>
                      {isSelected(parameter) ? (
                        <Input 
                          type="text" 
                          value={userValues[parameter.id] || ""}
                          onChange={(e) => handleUserValueChange(parameter.id, e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        parameter.value.toString()
                      )}
                    </TableCell>
                    <TableCell>
                      <Checkbox 
                        checked={isSelected(parameter)} 
                        onCheckedChange={() => toggleParameter(parameter)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Right panel - System objects */}
      <div className="flex-1 bg-white rounded-md shadow border">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Объекты:</h3>
          
          {noMatchMessage ? (
            <Card className="p-4 bg-amber-50 border-amber-300 mb-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <p className="text-amber-700">{noMatchMessage}</p>
              </div>
            </Card>
          ) : null}
          
          {filteredObjects.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Объект</TableHead>
                  <TableHead>Технико-экономические показатели</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredObjects.map((object) => (
                  <TableRow 
                    key={object.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSelectObject(object)}
                  >
                    <TableCell className="font-medium">{object.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {object.characteristics?.map((char) => (
                          <div key={char.id} className="text-sm">
                            <span className="font-medium">{char.name}:</span> {char.value.toString()}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : noMatchMessage ? null : (
            <p className="text-muted-foreground">Нет доступных объектов для выбранного типа.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParameterSelector;
