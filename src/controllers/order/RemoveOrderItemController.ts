import { Request, Response } from 'express';
import { RemoveOrderItemService } from '../../services/order/RemoveOrderItemService';

class RemoveOrderItemController {
  async handle(req: Request, res: Response) {
    const item_id = req.params.item_id as string;

    const removeOrderItemService = new RemoveOrderItemService();

    const orderItem = await removeOrderItemService.execute({
      item_id,
    });

    return res.json(orderItem);
  }
}

export { RemoveOrderItemController };
