import { useStore } from "../store/useStore";

const RoleSwitcher = () => {
  const { role, setRole } = useStore();

  return (
    <div className="flex justify-end">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;