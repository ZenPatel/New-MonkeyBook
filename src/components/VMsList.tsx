import { Link } from "react-router";

export const VMsList = () => {
  const vms = [
    { name: "DSL", path: "/vms/dsl"},
    { name: "MacOS", path: "/vms/macos"},
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
