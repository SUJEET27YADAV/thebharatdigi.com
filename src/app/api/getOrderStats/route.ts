import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/utils/admin/guard";
import { paiseToRupees } from "@/utils/format";

const trend = (current: number, previous: number, total: number) => ({
  value: total > 0 ? (current / total) * 100 : 0,
  direction: current >= previous ? ("up" as const) : ("down" as const),
});

const distinctEmails = (orders: { email: string }[]) => {
  const emails = new Set<string>();
  orders.forEach((o) => emails.add(o.email));
  return emails;
};

export async function GET(req: NextRequest) {
  if (!(await isAdminRequest(req))) return unauthorized();
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
    const firstOfLastMonth = new Date(
      firstOfThisMonth.getFullYear(),
      firstOfThisMonth.getMonth() - 1,
      1,
      0,
      0,
      0,
    );
    const thisMonthOrders = data.filter(
      (o) => new Date(o.created_at) >= firstOfThisMonth,
    );
    const lastMonthOrders = data.filter(
      (o) =>
        new Date(o.created_at) >= firstOfLastMonth &&
        new Date(o.created_at) < firstOfThisMonth,
    );
    const pastOrders = data.filter(
      (o) => new Date(o.created_at) < firstOfThisMonth,
    );

    const customersBeforeThisMonth = distinctEmails(pastOrders);
    const uniqueCustomersThisMonth = new Set(
      [...distinctEmails(thisMonthOrders)].filter(
        (email) => !customersBeforeThisMonth.has(email),
      ),
    );
    const customersBeforeLastMonth = distinctEmails(
      data.filter((o) => new Date(o.created_at) < firstOfLastMonth),
    );
    const uniqueCustomersLastMonth = new Set(
      [...distinctEmails(lastMonthOrders)].filter(
        (email) => !customersBeforeLastMonth.has(email),
      ),
    );
    const uniqueCustomers = distinctEmails(data);

    const totalRevenue = data.reduce(
      (acc, order) => acc + paiseToRupees(order.amount),
      0,
    );
    const totalRevenueThisMonth = thisMonthOrders.reduce(
      (acc, order) => acc + paiseToRupees(order.amount),
      0,
    );
    const totalRevenueLastMonth = lastMonthOrders.reduce(
      (acc, order) => acc + paiseToRupees(order.amount),
      0,
    );

    const totalSales = data.reduce(
      (acc, order) => acc + order.product_id.length,
      0,
    );
    const totalSalesThisMonth = thisMonthOrders.reduce(
      (acc, order) => acc + order.product_id.length,
      0,
    );
    const totalSalesLastMonth = lastMonthOrders.reduce(
      (acc, order) => acc + order.product_id.length,
      0,
    );

    const orderStats = {
      totalOrders: {
        value: data.length,
        trend: trend(
          thisMonthOrders.length,
          lastMonthOrders.length,
          data.length,
        ),
      },
      totalCustomers: {
        value: uniqueCustomers.size,
        trend: trend(
          uniqueCustomersThisMonth.size,
          uniqueCustomersLastMonth.size,
          uniqueCustomers.size,
        ),
      },
      totalRevenue: {
        value: totalRevenue,
        trend: trend(totalRevenueThisMonth, totalRevenueLastMonth, totalRevenue),
      },
      totalSales: {
        value: totalSales,
        trend: trend(totalSalesThisMonth, totalSalesLastMonth, totalSales),
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
