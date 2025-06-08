export interface Task {
  _id: string;
  name: string; 
  description?: string;
  startDateTime: string;
  endDateTime: string;
  category?: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}
