import prismaClient from '../../prisma';

interface OrderItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddOrderItemService {
  async execute({ order_id, product_id, amount }: OrderItemRequest) {
    const order = await prismaClient.orderItem.create({
      data: {
        order_id: order_id,
        product_id: product_id,
        amount: amount,
      },
    });

    return order;
  }
}

export { AddOrderItemService };
