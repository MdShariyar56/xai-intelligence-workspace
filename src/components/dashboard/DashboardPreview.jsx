"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Zap,
  FileText,
  Settings,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const VIEWS = {
  Overview: {
    icon: LayoutDashboard,
    stats: [
      {
        icon: TrendingUp,
        label: "Insights Generated",
        value: "1,284",
        change: "+12.4%",
      },
      { icon: Users, label: "Active Sources", value: "36", change: "+3" },
      {
        icon: Activity,
        label: "Automation Runs",
        value: "842",
        change: "+8.1%",
      },
    ],
    chartLabel: "Insights generated (7 days)",
    chartData: [
      { name: "Mon", value: 240 },
      { name: "Tue", value: 310 },
      { name: "Wed", value: 280 },
      { name: "Thu", value: 390 },
      { name: "Fri", value: 420 },
      { name: "Sat", value: 380 },
      { name: "Sun", value: 460 },
    ],
    table: [
      { col1: "CRM Pipeline", status: "Synced", updated: "2m ago" },
      { col1: "Support Tickets", status: "Synced", updated: "5m ago" },
      { col1: "Product Analytics", status: "Processing", updated: "Just now" },
      { col1: "Finance Ledger", status: "Synced", updated: "1h ago" },
    ],
  },
  Automations: {
    icon: Zap,
    stats: [
      { icon: Zap, label: "Active Workflows", value: "18", change: "+2" },
      { icon: Activity, label: "Runs Today", value: "204", change: "+6.7%" },
      {
        icon: TrendingUp,
        label: "Success Rate",
        value: "98.2%",
        change: "+0.4%",
      },
    ],
    chartLabel: "Automation runs (7 days)",
    chartData: [
      { name: "Mon", value: 120 },
      { name: "Tue", value: 180 },
      { name: "Wed", value: 150 },
      { name: "Thu", value: 220 },
      { name: "Fri", value: 260 },
      { name: "Sat", value: 190 },
      { name: "Sun", value: 240 },
    ],
    table: [
      { col1: "Auto-tag new leads", status: "Synced", updated: "1m ago" },
      { col1: "Escalate urgent tickets", status: "Synced", updated: "4m ago" },
      {
        col1: "Weekly digest email",
        status: "Processing",
        updated: "Just now",
      },
      { col1: "Sync to data warehouse", status: "Synced", updated: "20m ago" },
    ],
  },
  Reports: {
    icon: FileText,
    stats: [
      { icon: FileText, label: "Reports Generated", value: "63", change: "+9" },
      { icon: Users, label: "Shared With Team", value: "12", change: "+1" },
      {
        icon: TrendingUp,
        label: "Avg. Read Time",
        value: "3.4m",
        change: "-0.2m",
      },
    ],
    chartLabel: "Reports generated (7 days)",
    chartData: [
      { name: "Mon", value: 5 },
      { name: "Tue", value: 8 },
      { name: "Wed", value: 6 },
      { name: "Thu", value: 11 },
      { name: "Fri", value: 14 },
      { name: "Sat", value: 7 },
      { name: "Sun", value: 12 },
    ],
    table: [
      { col1: "Q3 Performance Summary", status: "Synced", updated: "3h ago" },
      { col1: "Customer Health Report", status: "Synced", updated: "6h ago" },
      { col1: "Revenue Forecast", status: "Processing", updated: "Just now" },
      { col1: "Churn Risk Analysis", status: "Synced", updated: "1d ago" },
    ],
  },
};

const NAV_LABELS = ["Overview", "Automations", "Reports"];

export default function DashboardPreview() {
  const [activeView, setActiveView] = useState("Overview");
  const view = VIEWS[activeView];

  return (
    <section className="bg-black px-6 py-32 md:px-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-3xl md:text-4xl font-semibold text-white"
      >
        See it inside your workspace
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16 max-w-lg text-gray-400"
      >
        A calm, focused interface designed for people who make decisions — not
        just people who read reports.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-6xl overflow-hidden rounded-2xl border border-gray-800 bg-[#0a0a0a] shadow-2xl"
      >
        <aside className="hidden w-56 shrink-0 border-r border-gray-800 p-4 md:block">
          <div className="mb-6 px-2 text-sm font-medium text-gray-500">
            Xai Workspace
          </div>
          <nav className="space-y-1">
            {NAV_LABELS.map((label) => (
              <SidebarItem
                key={label}
                label={label}
                icon={VIEWS[label].icon}
                isActive={activeView === label}
                onClick={() => setActiveView(label)}
              />
            ))}
            <div className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600">
              <Settings size={16} />
              Settings
            </div>
          </nav>
        </aside>

        <div className="flex-1 p-6 md:p-8">
          <div className="mb-8 flex gap-6 border-b border-gray-800">
            {NAV_LABELS.map((label) => (
              <button
                key={label}
                onClick={() => setActiveView(label)}
                className="relative pb-3 text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                <span className={activeView === label ? "text-white" : ""}>
                  {label}
                </span>
                {activeView === label && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-indigo-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {view.stats.map((card) => (
                  <StatCard key={card.label} card={card} />
                ))}
              </div>

              <div className="mb-8 rounded-xl border border-gray-800 p-4">
                <p className="mb-2 text-sm text-gray-500">{view.chartLabel}</p>
                <div className="h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={view.chartData}>
                      <XAxis
                        dataKey="name"
                        stroke="#4b5563"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          background: "#111",
                          border: "1px solid #333",
                          borderRadius: 8,
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-800">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500">
                      <th className="px-4 py-3 font-normal">Name</th>
                      <th className="px-4 py-3 font-normal">Status</th>
                      <th className="px-4 py-3 font-normal">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {view.table.map((row) => (
                      <tr
                        key={row.col1}
                        className="border-b border-gray-900 text-gray-300 last:border-0 hover:bg-gray-900/50"
                      >
                        <td className="px-4 py-3">{row.col1}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              row.status === "Synced"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {row.updated}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

function SidebarItem({ label, icon: Icon, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        isActive
          ? "bg-indigo-500/10 text-indigo-400"
          : "text-gray-400 hover:bg-gray-900 hover:text-white"
      }`}
    >
      <Icon size={16} />
      {label}
    </div>
  );
}

function StatCard({ card }) {
  const Icon = card.icon;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border border-gray-800 p-4 transition-colors hover:border-gray-700"
    >
      <div className="mb-3 flex items-center justify-between">
        <Icon size={16} className="text-gray-500" />
        <span className="text-xs text-green-400">{card.change}</span>
      </div>
      <p className="text-2xl font-semibold text-white">{card.value}</p>
      <p className="mt-1 text-xs text-gray-500">{card.label}</p>
    </motion.div>
  );
}
