import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "@repo/ui/utils/supabase/query/users";
import { NextRequest } from "next/server";

const commonHeader = {
  headers: { "Content-Type": "application/json" },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams.get("user_id");

  try {
    if (param === null) {
      const res = await getAllUsers();
      return Response.json({ status: "success", data: res }, commonHeader);
    } else {
      const res = await getUser(param);
      return Response.json({ status: "success", data: res }, commonHeader);
    }
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { status: "error", error: error.message },
        commonHeader
      );
    }
  }
}

export async function POST(request: NextRequest) {
  const { email, password, role, nickname } = await request.json();

  try {
    const res = await addUser(email, password, role, nickname);
    return Response.json({ status: "success", data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { status: "error", error: error.message },
        commonHeader
      );
    }
  }
}

export async function PATCH(request: NextRequest) {
  const { user_id, nickname, avatar } = await request.json();

  try {
    const res = await updateUser(user_id, nickname, avatar);
    return Response.json({ status: "success", data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { status: "error", error: error.message },
        commonHeader
      );
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { user_id } = await request.json();

  try {
    const res = await deleteUser(user_id);
    return Response.json({ status: "success", data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { status: "error", error: error.message },
        commonHeader
      );
    }
  }
}
