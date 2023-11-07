import { Content } from "./content";
import { Topbar } from "./topbar";

export const Layout = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col px-20 py-6 dark:bg-slate-900 bg-slate-200">
      <Topbar />
      <Content />
    </div>
  );
};
