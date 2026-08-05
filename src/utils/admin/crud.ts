import { createServerClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/utils/admin/guard";

type CrudMessages = {
  error: string;
  notFound: string;
  success: string;
};

type FetchMessages = {
  error: string;
  empty: string;
  success: string;
};

async function adminSupabase(req: NextRequest | null) {
  if (req && !(await isAdminRequest(req))) return null;
  return createServerClient();
}

export async function adminFetch(
  req: NextRequest | null,
  table: string,
  messages: FetchMessages,
) {
  const supabase = await adminSupabase(req);
  if (!supabase) return unauthorized();
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: messages.error, data: [] },
        { status: 404 },
      );
    }
    if (!data || data.length === 0) {
      return NextResponse.json(
        { success: false, msg: messages.empty, data: [] },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: messages.success, data },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: messages.error },
      { status: 500 },
    );
  }
}

export async function adminInsert(
  req: NextRequest,
  table: string,
  data: Record<string, unknown>,
  messages: CrudMessages,
) {
  const supabase = await adminSupabase(req);
  if (!supabase) return unauthorized();
  try {
    const { data: row, error } = await supabase
      .from(table)
      .insert(data)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: messages.error },
        { status: 404 },
      );
    }
    if (!row) {
      return NextResponse.json(
        { success: false, msg: messages.notFound },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: messages.success },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: messages.error },
      { status: 500 },
    );
  }
}

export async function adminUpdate(
  req: NextRequest,
  table: string,
  id: string,
  data: Record<string, unknown>,
  messages: CrudMessages,
) {
  const supabase = await adminSupabase(req);
  if (!supabase) return unauthorized();
  try {
    const { data: row, error } = await supabase
      .from(table)
      .update(data)
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: messages.error },
        { status: 404 },
      );
    }
    if (!row) {
      return NextResponse.json(
        { success: false, msg: messages.notFound },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: messages.success },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: messages.error },
      { status: 500 },
    );
  }
}

export async function adminDelete(
  req: NextRequest,
  table: string,
  messages: CrudMessages,
) {
  const supabase = await adminSupabase(req);
  if (!supabase) return unauthorized();
  try {
    const { id } = await req.json();
    const { data: row, error } = await supabase
      .from(table)
      .delete()
      .eq("id", id)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, msg: messages.error },
        { status: 404 },
      );
    }
    if (!row) {
      return NextResponse.json(
        { success: false, msg: messages.notFound },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { success: true, msg: messages.success },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: messages.error },
      { status: 500 },
    );
  }
}
