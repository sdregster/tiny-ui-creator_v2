
export interface ObjectType {
  id: string;
  label: string;
  count: number;
}

export interface Parameter {
  id: string;
  name: string;
  value: string | number;
  unit?: string;
}

export interface SystemObject {
  id: string;
  name: string;
  type: string;
  subtype?: string;
  typeOfSubobject?: string;
  characteristics?: Parameter[];
  value?: string | number;
  selected?: boolean;
}

export interface SubObject {
  id: string;
  name: string;
  type: string;
  characteristics: Parameter[];
  count: number;
  selected: boolean;
}

export interface CreatedObject {
  id: string;
  name: string;
  type: ObjectType;
  parameters: Parameter[];
  subObjects: SubObject[];
}
