import { prisma } from "@/lib/prisma";
import { deleteUser, updateUserRole } from "@/actions/admin";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ผู้ใช้งานทั้งหมด</h1>

      <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
        {users.length === 0 ? (
          <div className="p-10 text-center text-[var(--muted-foreground)]">ยังไม่มีผู้ใช้งาน</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">ผู้ใช้</th>
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">คำสั่งซื้อ</th>
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">Role</th>
                  <th className="text-left px-5 py-3 font-medium text-[var(--muted-foreground)]">วันที่สมัคร</th>
                  <th className="text-right px-5 py-3 font-medium text-[var(--muted-foreground)]">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium">{user.name ?? "-"}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[var(--muted-foreground)]">{user._count.orders} รายการ</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${user.role === "ADMIN" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[var(--muted-foreground)]">
                      {new Date(user.createdAt).toLocaleDateString("th-TH")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <form action={updateUserRole.bind(null, user.id, user.role === "ADMIN" ? "USER" : "ADMIN")}>
                          <button
                            type="submit"
                            className="text-xs px-3 py-1.5 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                          >
                            {user.role === "ADMIN" ? "ลด → USER" : "เพิ่ม → ADMIN"}
                          </button>
                        </form>
                        <form action={deleteUser.bind(null, user.id)}>
                          <button
                            type="submit"
                            className="text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={(e) => {
                              if (!confirm("ต้องการลบผู้ใช้นี้?")) e.preventDefault();
                            }}
                          >
                            ลบ
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
