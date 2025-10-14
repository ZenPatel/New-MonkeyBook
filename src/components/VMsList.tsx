import { Link } from "react-router";

export const VMsList = () => {
    return (
        <div className="space-y-4">
            <div className="border border-white/10 p-4 sm:p-6 rounded-lg hover:-translate-y-1 transition transform bg-gray-900/30"> 
                <Link
                  to="/vms/windows98"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Windows 98
                </Link>
            </div>
        </div>
    )
}