
export interface Task {
    id?: number;
    title: string;
    description?: string;
    status?: 'todo' | 'in_progress' | 'done';
    employeeId: number;
    startDate: string; 
    endDate: string;
  
  }
  