import { IoCheckmarkCircle } from "react-icons/io5";
import { motion } from "framer-motion";

const Completed = () => {
  const activities = [
    {
      task: "Send a package",
      time: "3:31 PM",
      project: "Inbox ☉"
    },
    {
      task: "Make a productivity quiz",
      time: "3:31 PM",
      project: "Inbox ☉"
    }
  ];

  return (
    <motion.div
      className="min-h-screen px-6 py-8 font-sans transition-colors"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Completed</h1>

        </div>
        <p className="text-sm text-gray-400 mt-1">
          A summary of your completed tasks across all projects.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="rounded-lg border border-[var(--border-color)] bg-[var(--button-bg)] shadow-md p-6">
          <h2 className="text-base font-medium text-[var(--text-color)] mb-6">
            Today · May 21 · Wednesday
          </h2>

          <div className="flex flex-col gap-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 rounded-md border border-[var(--border-color)] hover:shadow transition-colors bg-[var(--bg-color)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <IoCheckmarkCircle className="text-[var(--primary-color)] w-5 h-5 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--text-color)]">
                    You completed <span className="font-medium">{activity.task}</span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-color)]/60 mt-1">
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span>{activity.project}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center pt-6 text-sm text-[var(--text-color)]/60">
              That’s it. No more history to load.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Completed;
