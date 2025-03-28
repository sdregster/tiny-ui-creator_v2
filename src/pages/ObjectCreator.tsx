
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ObjectTypeSelector from "@/components/ObjectTypeSelector";
import ParameterSelector from "@/components/ParameterSelector";
import SubObjectSelector from "@/components/SubObjectSelector";
import ProgressModal from "@/components/ProgressModal";
import { ObjectType, Parameter, SystemObject, SubObject } from "@/types/object-types";

enum CreationStep {
  SELECT_TYPE,
  SELECT_PARAMETERS,
  SELECT_SUBOBJECTS
}

const ObjectCreator = () => {
  const [step, setStep] = useState<CreationStep>(CreationStep.SELECT_TYPE);
  const [selectedType, setSelectedType] = useState<ObjectType | null>(null);
  const [selectedParameters, setSelectedParameters] = useState<Parameter[]>([]);
  const [selectedObject, setSelectedObject] = useState<SystemObject | null>(null);
  const [selectedSubObjects, setSelectedSubObjects] = useState<SubObject[]>([]);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [filteredObjectsCount, setFilteredObjectsCount] = useState<number>(0);
  
  const handleTypeSelect = (type: ObjectType) => {
    setSelectedType(type);
    setStep(CreationStep.SELECT_PARAMETERS);
    setSelectedParameters([]);
    setSelectedObject(null);
    setFilteredObjectsCount(0);
  };
  
  const handleParameterSelect = (parameters: Parameter[]) => {
    setSelectedParameters(parameters);
  };
  
  const handleObjectSelect = (object: SystemObject) => {
    setSelectedObject(object);
  };
  
  const handleNext = () => {
    if (step === CreationStep.SELECT_PARAMETERS && selectedObject) {
      setStep(CreationStep.SELECT_SUBOBJECTS);
    }
  };
  
  const handleBack = () => {
    if (step === CreationStep.SELECT_SUBOBJECTS) {
      setStep(CreationStep.SELECT_PARAMETERS);
    } else if (step === CreationStep.SELECT_PARAMETERS) {
      setStep(CreationStep.SELECT_TYPE);
      setSelectedType(null);
      setSelectedParameters([]);
      setSelectedObject(null);
      setFilteredObjectsCount(0);
    }
  };
  
  const handleFinish = (subObjects: SubObject[]) => {
    setSelectedSubObjects(subObjects);
    setShowProgressModal(true);
  };
  
  const handleCloseModal = () => {
    setShowProgressModal(false);
    // Reset form after successful creation
    setStep(CreationStep.SELECT_TYPE);
    setSelectedType(null);
    setSelectedParameters([]);
    setSelectedObject(null);
    setSelectedSubObjects([]);
    setFilteredObjectsCount(0);
  };
  
  // Update filteredObjectsCount when objects are filtered in ParameterSelector
  const handleObjectsFiltered = (count: number) => {
    setFilteredObjectsCount(count);
  };
  
  // Whether the next button should be enabled - only when exactly one object is selected
  const isNextEnabled = selectedObject !== null && filteredObjectsCount === 1;
  
  return (
    <div className="container mx-auto p-4">
      <Card className="bg-[#1A3C61] text-white mb-4 p-4">
        <h1 className="text-xl font-bold">Конструктор объектов</h1>
      </Card>
      
      {step === CreationStep.SELECT_TYPE && (
        <ObjectTypeSelector onSelectType={handleTypeSelect} />
      )}
      
      {step === CreationStep.SELECT_PARAMETERS && selectedType && (
        <>
          <div className="flex justify-between mb-4">
            <Button variant="outline" onClick={handleBack}>
              Назад
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!isNextEnabled}
            >
              Далее
            </Button>
          </div>
          <ParameterSelector 
            objectType={selectedType.id}
            selectedParameters={selectedParameters}
            onSelectParameters={handleParameterSelect}
            onSelectObject={handleObjectSelect}
            onObjectsFiltered={handleObjectsFiltered}
          />
        </>
      )}
      
      {step === CreationStep.SELECT_SUBOBJECTS && selectedType && selectedObject && (
        <>
          <div className="flex justify-start mb-4">
            <Button variant="outline" onClick={handleBack}>
              Назад
            </Button>
          </div>
          <SubObjectSelector 
            objectType={selectedType.id}
            selectedObject={selectedObject}
            onNext={handleFinish}
          />
        </>
      )}
      
      <ProgressModal 
        open={showProgressModal} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ObjectCreator;
