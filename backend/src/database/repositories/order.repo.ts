import { OrderItemType, OrderStatusType, PaymentMethodType } from '../../types/Order.types';
import { Order } from '../models/order.model';

class OrderRepo {
  async getOrders(past: string, userId: string) {
    let query = {
      status: { $in: [OrderStatusType.PAID] },
      created_by: userId,
    };

    if (past === 'true') {
      query = {
        status: { $in: [OrderStatusType.DELIVERED, OrderStatusType.CANCELLED] },
        created_by: userId,
      };
    }

    return await Order.find(query).populate('products.product');
  }

  async getOrderById(orderId: string) {
    return await Order.findById(orderId).populate('products.product');
  }

  async checkoutOrder(
    userId: string,
    totalPrice: Number,
    addressId: string,
    payment_method: PaymentMethodType,
    cart?: OrderItemType[]
  ) {
    return await Order.create({
      products: cart,
      totalPrice,
      delivery_address: addressId,
      payment_method,
      created_by: userId,
    });
  }

  async cancelOrder(orderId: string, userId: string) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.created_by.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    if (order.status === OrderStatusType.DELIVERED) {
      throw new Error('Order cannot be cancelled');
    }

    order.status = OrderStatusType.CANCELLED;
    await order.save();
    return order;
  }

  async getProductOrderCount(productId: string): Promise<number> {
    const orders = await Order.find({ 'products.product': productId });
    let totalQuantity = 0;
    orders.forEach((order) => {
      order.products.forEach((product) => {
        if (product.product.toString() === productId) {
          totalQuantity += product.quantity;
        }
      });
    });
    return totalQuantity;
  }
}
export default new OrderRepo();
