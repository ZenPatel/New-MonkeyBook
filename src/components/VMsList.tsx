import { Link } from "react-router-dom";

const vms = [
  { name: "Windows 98", path: "/vms/windows98" },
];

export const VMsList = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
    <div className="grid gap-4 w-full max-w-md">
      {vms.map((vm) => (
        <div
          key={vm.path}
          className="border border-white/10 p-6 rounded-lg bg-gray-900/40 backdrop-blur-sm 
                     hover:-translate-y-1 hover:border-white/20 transition-transform duration-300"
        >
          <Link
            to={vm.path}
            className="block text-center text-lg font-medium text-gray-400 hover:text-white transition-colors"
          >
            {vm.name}
          </Link>
        </div>
      ))}
    </div>
  </div>
);
