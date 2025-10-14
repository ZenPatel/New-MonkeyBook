import { Link } from "react-router";

export const VMsList = () => {
  const vms = [
    { name: "Windows 98", path: "/vms/windows98" },
    { name: "Windows XP", path: "/vms/windowsxp" },
    { name: "Ubuntu 20.04", path: "/vms/ubuntu2004" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <div className="space-y-4 w-full max-w-md">
        {vms.map((vm) => (
          <div
            key={vm.path}
            className="border border-white/10 p-4 sm:p-6 rounded-lg hover:-translate-y-1 transition transform bg-gray-900/30"
          >
            <Link
              to={vm.path}
              className="block text-center text-lg sm:text-xl font-semibold text-gray-300 hover:text-white tracking-wide transition-colors"
            >
              {vm.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};