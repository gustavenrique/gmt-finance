export type Order = {
  userId: string;
  stock: string;
  quantity: number;
  unitPrice: number;
  operationType: OperationType;
  createdAt: Date;
};

export enum OperationType {
  Purchase,
  Sale,
}
