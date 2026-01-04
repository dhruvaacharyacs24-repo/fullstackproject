import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../integrations/supabase/client";
import { QRCodeCanvas } from "qrcode.react";
import DashboardLayout from "../components/DashboardLayout";

export default function StudentDashboard() {
  const router = useRouter();

  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [bookedSlots, setBookedSlots] = useState<number[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [view, setView] = useState<
    "dashboard" | "slots" | "confirmation"
  >("dashboard");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("event_date");

    setEvents(data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function fetchBookedSlots(eventId: string) {
    const { data } = await supabase
      .from("bookings")
      .select("slot_number")
      .eq("event_id", eventId);

    setBookedSlots(data ? data.map((b) => b.slot_number) : []);
  }

  async function handleBookParking(event: any) {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setError("");
    await fetchBookedSlots(event.id);
    setView("slots");
  }

  async function confirmBooking() {
    if (!selectedSlot || !selectedEvent) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      event_id: selectedEvent.id,
      slot_number: selectedSlot,
    });

    if (error) {
      setError("❌ Slot already booked. Please select another.");
      await fetchBookedSlots(selectedEvent.id);
      setSelectedSlot(null);
      return;
    }

    setView("confirmation");
  }

  function goBack() {
    setSelectedEvent(null);
    setSelectedSlot(null);
    setBookedSlots([]);
    setError("");
    setView("dashboard");
  }

  /* =======================
     SLOT SELECTION VIEW
     ======================= */
  if (view === "slots" && selectedEvent) {
    return (
      <DashboardLayout title="Student Dashboard" onLogout={handleLogout}>
        {/* HEADER ROW */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            Select Parking Slot – {selectedEvent.name}
          </h2>

          {/* CANCEL BUTTON (TOP RIGHT) */}
          <button
            onClick={goBack}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-semibold transition"
          >
            Cancel
          </button>
        </div>

        {error && (
          <p className="mb-3 text-sm text-red-400 font-semibold">
            {error}
          </p>
        )}

        <div className="grid grid-cols-6 gap-3 mb-6">
          {Array.from({ length: selectedEvent.total_slots }).map((_, i) => {
            const slot = i + 1;
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedSlot === slot;

            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => setSelectedSlot(slot)}
                className={`h-10 rounded-lg text-sm font-semibold transition
                  ${
                    isBooked
                      ? "bg-amber-400 text-black cursor-not-allowed"
                      : isSelected
                      ? "bg-green-600 text-white"
                      : "bg-white/10 hover:bg-green-500 text-white"
                  }`}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <button
          disabled={!selectedSlot}
          onClick={confirmBooking}
          className="bg-green-600 px-6 py-2 rounded-xl font-semibold disabled:opacity-50"
        >
          Confirm Booking
        </button>
      </DashboardLayout>
    );
  }

  /* =======================
     CONFIRMATION VIEW
     ======================= */
  if (view === "confirmation" && selectedEvent) {
    const qrText = `EVENT: ${selectedEvent.name}
DATE: ${selectedEvent.event_date}
SLOT: ${selectedSlot}`;

    return (
      <DashboardLayout title="Student Dashboard" onLogout={handleLogout}>
        <div className="flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold mb-6">
            🎉 Booking Confirmed
          </h2>

          <div className="bg-white p-4 rounded-xl mb-4">
            <QRCodeCanvas value={qrText} size={180} />
          </div>

          <p className="text-lg font-semibold">
            Slot Number: {selectedSlot}
          </p>

          <button
            onClick={goBack}
            className="mt-6 bg-indigo-600 px-6 py-2 rounded-xl font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }

  /* =======================
     DASHBOARD VIEW
     ======================= */
  return (
    <DashboardLayout title="Student Dashboard" onLogout={handleLogout}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6 text-white"
          >
            <h3 className="text-lg font-semibold mb-1">{e.name}</h3>
            <p className="text-sm opacity-80 mb-3">{e.event_date}</p>

            <button
              onClick={() => handleBookParking(e)}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl font-semibold"
            >
              Book Parking
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
