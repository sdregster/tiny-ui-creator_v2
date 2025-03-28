
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SystemObject, SubObject } from "@/types/object-types";
import { subObjectTypes } from "@/data/mock-data";

interface SubObjectSelectorProps {
  objectType: string;
  selectedObject: SystemObject;
  onNext: (subObjects: SubObject[]) => void;
}

const SubObjectSelector = ({ objectType, selectedObject, onNext }: SubObjectSelectorProps) => {
  const [subObjects, setSubObjects] = useState<SubObject[]>([]);
  const [objectName, setObjectName] = useState("");
  
  useEffect(() => {
    const availableSubObjects = subObjectTypes[objectType] || [];
    setSubObjects(availableSubObjects);
    setObjectName(selectedObject.name || "Новый объект");
  }, [objectType, selectedObject]);

  const toggleSubObject = (id: string) => {
    setSubObjects(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
  };

  const updateSubObjectCount = (id: string, count: number) => {
    setSubObjects(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, count: count };
      }
      return item;
    }));
  };

  const handleCreateObject = () => {
    const selectedSubObjects = subObjects.filter(item => item.selected);
    onNext(selectedSubObjects);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Label htmlFor="objectName">Наименование нового объекта</Label>
          <Input 
            id="objectName" 
            value={objectName} 
            onChange={(e) => setObjectName(e.target.value)} 
            className="w-[300px]"
          />
        </div>
        <div className="space-x-2">
          <Button variant="outline">Выгрузить Excel</Button>
          <Button onClick={handleCreateObject}>Создать объект</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Объект</TableHead>
            <TableHead>ИР код на ГТП</TableHead>
            <TableHead>Подобъект</TableHead>
            <TableHead>Тип подобъекта</TableHead>
            <TableHead>Характеристики</TableHead>
            <TableHead>Значение</TableHead>
            <TableHead>Наименование ТЭП</TableHead>
            <TableHead>Фактические ТЭП</TableHead>
            <TableHead>Выбрать</TableHead>
            <TableHead>Кол-во</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subObjects.map((subObject) => (
            <TableRow key={subObject.id}>
              <TableCell>{selectedObject.name}</TableCell>
              <TableCell>{subObject.id.substring(0, 4)}</TableCell>
              <TableCell>{subObject.name}</TableCell>
              <TableCell>{subObject.type}</TableCell>
              <TableCell>
                {subObject.characteristics.map((char, idx) => (
                  <div key={idx} className="text-sm mb-1">{char.name}</div>
                ))}
              </TableCell>
              <TableCell>
                {subObject.characteristics.map((char, idx) => (
                  <div key={idx} className="text-sm mb-1">{char.value.toString()}</div>
                ))}
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <Checkbox 
                  checked={subObject.selected} 
                  onCheckedChange={() => toggleSubObject(subObject.id)}
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  min="1" 
                  value={subObject.count} 
                  onChange={(e) => updateSubObjectCount(subObject.id, parseInt(e.target.value) || 1)}
                  className="w-16"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubObjectSelector;
