import axiosInstance from "@/modules/shared/services/axiosInstance";
import OrderCard from "../components/OrderCard";
import { Order } from "../utils/types";
import { useLoaderData } from "react-router";

export default function PastOrders() {
  const orders = useLoaderData() as Order[];
  return (
    <div className="grid max-h-screen grid-cols-3 gap-4 overflow-x-auto overflow-y-auto p-28">
      {orders?.map((order) => <OrderCard key={order._id} order={order} />)}
    </div>
  );
}

export async function loader() {
  console.log("Past Orders loader");
  const res = await axiosInstance.get("/orders?past=true");

  return res.data.data.orders;
}