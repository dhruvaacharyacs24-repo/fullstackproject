import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../integrations/supabase/client";
import DashboardLayout from "../components/DashboardLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts";

/* =======================
   COLOR SYSTEM
   ======================= */
const COLORS = ["#22c55e", "#f59e0b"];

/* =======================
   3D PIE SLICE
   ======================= */
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy + 7}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#000"
        opacity={0.2}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function AdminDashboard() {
  const router = useRouter();

  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<number>(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("event_date");
    setEvents(data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  /* =======================
     ADD EVENT (UNCHANGED LOGIC)
     ======================= */
  async function addEvent() {
    if (!name || !date || !slots) return;

    await supabase.from("events").insert({
      name,
      event_date: date,
      total_slots: slots,
      is_active: true,
    });

    setName("");
    setDate("");
    setSlots(0);
    setShowAddModal(false);
    fetchEvents();
  }

  async function openEvent(event: any) {
    setSelectedEvent(event);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("event_id", event.id)
      .order("slot_number");
    setBookings(data || []);
  }

  async function deleteBooking(id: string) {
    await supabase.from("bookings").delete().eq("id", id);
    openEvent(selectedEvent);
  }

  async function deleteEvent() {
    if (!selectedEvent) return;

    await supabase.from("bookings").delete().eq("event_id", selectedEvent.id);
    await supabase.from("events").delete().eq("id", selectedEvent.id);

    setShowDeleteModal(false);
    setSelectedEvent(null);
    fetchEvents();
  }

  /* =======================
     EVENT VIEW
     ======================= */
  if (selectedEvent) {
    const booked = bookings.length;
    const available = selectedEvent.total_slots - booked;

    const pieData = [
      { name: "Available", value: available },
      { name: "Booked", value: booked },
    ];

    return (
      <DashboardLayout title="Admin Dashboard" onLogout={handleLogout}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {selectedEvent.name} – Slot Analytics
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => setSelectedEvent(null)}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-white font-semibold"
            >
              Back
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600/80 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
            >
              Cancel Event
            </button>
          </div>
        </div>

        {/* PIE */}
        <div className="w-full h-72 mb-10">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* SLOT GRID */}
        <div className="grid grid-cols-6 gap-3">
          {Array.from({ length: selectedEvent.total_slots }).map((_, i) => {
            const slot = i + 1;
            const booking = bookings.find(b => b.slot_number === slot);

            return (
              <button
                key={slot}
                onClick={() => booking && deleteBooking(booking.id)}
                className={`h-10 rounded-lg text-sm font-semibold
                  ${
                    booking
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-black"
                      : "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                  }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        {/* DELETE CONFIRM */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-2xl">
              <h3 className="text-lg font-bold mb-3">Delete Event?</h3>
              <p className="text-sm text-gray-600 mb-6">
                This will permanently remove the event and all bookings.
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteEvent}
                  className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
                >
                  OK, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    );
  }

  /* =======================
     MAIN DASHBOARD
     ======================= */
  return (
    <DashboardLayout title="Admin Dashboard" onLogout={handleLogout}>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl text-white font-semibold"
      >
        + Add Event
      </button>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(e => (
          <div
            key={e.id}
            onClick={() => openEvent(e)}
            className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white cursor-pointer hover:bg-white/20"
          >
            <h3 className="font-semibold">{e.name}</h3>
            <p className="text-sm opacity-80">{e.event_date}</p>
            <p className="text-xs mt-2 text-green-300">
              Total Slots: {e.total_slots}
            </p>
          </div>
        ))}
      </div>

      {/* =======================
         ADD EVENT MODAL (FIXED UI)
         ======================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-bold mb-5 text-gray-800">
              Add New Event
            </h3>

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Event Name
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-black focus:ring-2 focus:ring-indigo-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Event Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-black focus:ring-2 focus:ring-indigo-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Total Slots
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded-lg mb-6 text-black focus:ring-2 focus:ring-indigo-500 outline-none"
              value={slots}
              onChange={(e) => setSlots(Number(e.target.value))}
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
