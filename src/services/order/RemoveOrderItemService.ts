import prismaClient from '../../prisma';

interface ItemRequest {
  item_id: string;
}

class RemoveOrderItemService {
  async execute({ item_id }: ItemRequest) {
    const orderItem = await prismaClient.orderItem.delete({
      where: { id: item_id },
    });

    return orderItem;
  }
}

export { RemoveOrderItemService };
