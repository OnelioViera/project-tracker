export interface Project {
  _id?: string;
  name: string;
  client: string;
  productTypes: string[];
  deadline: string;
  status: 'Draft' | 'In Review' | 'Revision Needed' | 'Approved' | 'Complete';
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductType {
  _id?: string;
  name: string;
  createdAt?: Date;
}

export const STATUSES = ['Draft', 'In Review', 'Revision Needed', 'Approved', 'Complete'] as const;

export const DEFAULT_PRODUCT_TYPES = [
  'BESS Foundation',
  'Solar Equipment',
  'Utility Vault',
  'Manhole',
  'Box Culvert',
  'Bridge Product',
  'Storm Sewer',
  'Sanitary Sewer'
];

