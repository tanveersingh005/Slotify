const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center pt-20 pb-20 min-h-[calc(100vh-65px)] bg-gradient-to-b from-blue-50/20 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      
      {/* Premium Background Mesh */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[linear-gradient(to_right,#3b82f604_1px,transparent_1px),linear-gradient(to_bottom,#3b82f604_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none z-0" />
      
      {/* Background Soft Glow Bulbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-[95px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
