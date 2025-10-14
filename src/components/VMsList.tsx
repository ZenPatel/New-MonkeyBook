import { Link } from "react-router";

export const VMsList = () => {
  const vms = [
    { name: "Apple System 1", path: "/vms/system1"},
    { name: "Chokanji 4", path: "/vms/chokanji4"},
    { name: "DSL", path: "/vms/dsl"},
    { name: "FreeGEM", path: "/vms/freegem"},
    { name: "MacOS", path: "/vms/macos"},
    { name: "MacOS 8", path: "/vms/macos8"},
    { name: "MacOS 9", path: "/vms/macos9"},
    { name: "Windows 1", path: "/vms/windows1" },
    { name: "Windows 2000", path: "/vms/windows2000" },
    { name: "Windows 93", path: "/vms/windows93" },
    { name: "Windows 96", path: "/vms/windows96" },
    { name: "Windows 98", path: "/vms/windows98" },
  ];

  return (
    <div className="space-y-4">
      {vms.map((vm) => (
        <div
          key={vm.path}
          className="border border-white/10 p-4 sm:p-6 rounded-lg hover:-translate-y-1 transition transform bg-gray-900/30"
        >
          <Link
            to={vm.path}
            className="block text-lg sm:text-2xl font-bold text-white hover:text-yellow-300 transition-colors mb-2 text-center"
          >
            {vm.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
