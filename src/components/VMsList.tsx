import { Link } from "react-router";

export const VMsList = () => {
  const vms = [
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
            className="block text-lg font-medium text-gray-300 hover:text-white transition-colors tracking-wide text-center"
          >
            {vm.name}
          </Link>
        </div>
      ))}
    </div>
  );
};
