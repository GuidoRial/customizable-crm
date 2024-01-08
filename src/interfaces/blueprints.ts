export interface Blueprint {
  name: string;
  description: string;
  metadata: {
    canBeReferenced: boolean;
    map: string;
  };
}

export interface Field {
  label: string;
  type: 'text' | 'select' | 'number' | 'checkbox' | 'radio' | 'textarea' | 'date' /*'reference';*/; // Reference will have to wait
  required: boolean;
  options?: string[];
}
