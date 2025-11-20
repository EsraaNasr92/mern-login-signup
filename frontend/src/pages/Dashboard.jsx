import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard(){
    const { logout, user } = useContext(AuthContext);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="border-r border-gray-300 p-10 flex flex-col h-screen">
                <h1 className="text-2x1 font-semibold mb-8">Signing App</h1>
                <nav className="space-y-4">
                    <a
                        href="/dashboard"
                        className="block text-lg text-gray-700 hover:text-blue-500"
                    >
                        Dashboard
                    </a>
                    <a
                        href="/profile"
                        className="block text-lg text-gray-700 hover:text-blue-500"
                    >
                        Profile
                    </a>
                    <a
                        href="/settings"
                        className="block text-lg text-gray-700 hover:text-blue-500"
                    >
                        Settings
                    </a>
                </nav>
                <button
                    onClick={() => logout()}
                    className="mt-auto w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 p-10">
                <h1 className="text-3xl font-semibold mb-6">Hello {user?.name}</h1>

                <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-700">
                    Welcome to your dashboard! You can place your widgets, stats, charts, or tables here.
                </p>
                </div>
            </main>
        </div>
    );
}
