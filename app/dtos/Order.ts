export type Order = {
  userId: string;
  stock: string;
  quantity: number;
  unitPrice: number;
  operationType: OperationType;
};

export type OperationType = 'Purchase' | 'Sale';