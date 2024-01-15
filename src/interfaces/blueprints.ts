export interface Blueprint {
  _id?: string;
  name: string;
  description: string;
  metadata: {
    canBeReferenced: boolean;
    map: string;
  };
  fields?: Field[];
}

export interface Field {
  label: string;
  type: 'text' | 'select' | 'number' | 'checkbox' | 'radio' | 'textarea' | 'date' /*'reference';*/; // Reference will have to wait
  required: boolean;
  options: string[];
  key?: string;
  description?: string;
}
