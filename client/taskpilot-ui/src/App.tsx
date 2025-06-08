import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md py-6 mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">📋 Task Manager</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}
