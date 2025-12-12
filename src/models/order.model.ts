export default class OrderModel {
  public id: number = -1;
  public title: string = "";
  public code: number = 0;
  public quantity: number = 0;
  public dueDate?: Date | undefined;
}
