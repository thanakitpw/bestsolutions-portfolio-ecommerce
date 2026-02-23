import { prisma } from "@/lib/prisma";
import { deleteUser, updateUserRole } from "@/actions/admin";
import { Trash2 } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">จัดการผู้ใช้งาน</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">{users.length} บัญชี</p>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--muted)]">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">ผู้ใช้งาน</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">คำสั่งซื้อ</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">สิทธิ์</th>
                <th className="text-left px-6 py-3 font-medium text-[var(--muted-foreground)]">วันที่สมัคร</th>
                <th className="text-right px-6 py-3 font-medium text-[var(--muted-foreground)]">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{user.name ?? "—"}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted-foreground)]">
                    {user._count.orders} รายการ
                  </td>
                  <td className="px-6 py-4">
                    <form action={async (formData: FormData) => {
                      "use server";
                      const role = formData.get("role") as "USER" | "ADMIN";
                      await updateUserRole(user.id, role);
                    }}>
                      <select
                        name="role"
                        defaultValue={user.role}
                        onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 focus:outline-none cursor-pointer ${
                          user.role === "ADMIN"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                      <button type="submit" className="sr-only">บันทึก</button>
                    </form>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted-foreground)]">
                    {new Date(user.createdAt).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <form action={deleteUser.bind(null, user.id)}>
                        <button
                          type="submit"
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors text-[var(--muted-foreground)] hover:text-red-500"
                          onClick={(e) => {
                            if (!confirm(`ลบผู้ใช้ "${user.email}" ใช่หรือไม่?`)) e.preventDefault();
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
