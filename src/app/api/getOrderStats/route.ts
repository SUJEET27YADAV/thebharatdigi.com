import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  try {
    const { data, error } = await supabase.from("customers").select("*");
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: "Error fetching orders stats", data: [] },
        { status: 404 },
      );
    }
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, msg: "Orders stats not found", data: [] },
        { status: 404 },
      );
    }
    const firstOfThisMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
      0,
      0,
      0,
    );
    const thisMonthOrders = data.filter(
      (o) => new Date(o.created_at) >= firstOfThisMonth,
    );
    const pastOrders = data.filter(
      (o) => new Date(o.created_at) < firstOfThisMonth,
    );
    const totalOrderstrend = {
      value: (thisMonthOrders.length / data.length) * 100,
      direction:
        (thisMonthOrders.length / data.length) * 100 >= 0 ? "up" : "down",
    };
    const uniqueCustomers = [] as string[];
    data.map(
      (c) =>
        !uniqueCustomers.includes(c.email) && uniqueCustomers.push(c.email),
    );
    const uniqueCustomersBeforeThisMonth = [] as string[];
    pastOrders.map(
      (c) =>
        !uniqueCustomersBeforeThisMonth.includes(c.email) &&
        uniqueCustomersBeforeThisMonth.push(c.email),
    );
    const uniqueCustomersThisMonth = [] as string[];
    thisMonthOrders.map(
      (c) =>
        !uniqueCustomersBeforeThisMonth.includes(c.email) &&
        !uniqueCustomersThisMonth.includes(c.email) &&
        uniqueCustomersThisMonth.push(c.email),
    );
    const uniqueCustomersTrend = {
      value: (uniqueCustomersThisMonth.length / uniqueCustomers.length) * 100,
      direction:
        (uniqueCustomersThisMonth.length / uniqueCustomers.length) * 100 >= 0
          ? "up"
          : "down",
    };
    const totalRevenue =
      data.reduce((acc, order) => acc + order.amount, 0) / 100;
    const totalRevenueThisMonth = thisMonthOrders.reduce(
      (acc, order) => acc + order.amount,
      0,
    );
    const totalRevenueTrend = {
      value: totalRevenueThisMonth / totalRevenue,
      direction: totalRevenueThisMonth / totalRevenue >= 0 ? "up" : "down",
    };
    const totalSales = data.reduce(
      (acc, order) => acc + order.product_id.length,
      0,
    );
    const totalSalesThisMonth = thisMonthOrders.reduce(
      (acc, order) => acc + order.product_id.length,
      0,
    );
    const totalSalesTrend = {
      value: (totalSalesThisMonth / totalSales) * 100,
      direction: (totalSalesThisMonth / totalSales) * 100 >= 0 ? "up" : "down",
    };

    const orderStats = {
      totalOrders: {
        value: data.length,
        trend: totalOrderstrend,
      },
      totalCustomers: {
        value: uniqueCustomers.length,
        trend: uniqueCustomersTrend,
      },
      totalRevenue: {
        value: totalRevenue,
        trend: totalRevenueTrend,
      },
      totalSales: {
        value: totalSales,
        trend: totalSalesTrend,
      },
    };
    return NextResponse.json(
      {
        success: true,
        msg: "Orders stats fetched successfully",
        data: orderStats,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Error fetching orders stats" },
      { status: 500 },
    );
  }
}
