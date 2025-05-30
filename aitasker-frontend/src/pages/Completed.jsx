import { IoCheckmarkCircle } from "react-icons/io5";

const Completed = () => {
  const activities = [
    {
      task: "Enviar un paquete",
      time: "3:31 PM",
      project: "Inbox ☉"
    },
    {
      task: "Hacer el quiz de métodos de productividad",
      time: "3:31 PM",
      project: "Inbox ☉"
    }
  ];

  return (
    <div className="flex justify-center w-full min-h-full p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-[var(--text-color)]">Activity: All projects</h1>

        <div className="bg-[var(--bg-color)] rounded-lg shadow-sm p-4 border border-[var(--border-color)]">
          <h2 className="text-lg font-medium text-[var(--text-color)] mb-4">
            May 21 - Today - Wednesday
          </h2>

          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={index} className="border-b border-[var(--border-color)] pb-6 last:border-0">
                <div className="flex items-start gap-3">
                  <IoCheckmarkCircle className="text-[var(--primary-color)] w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-[var(--text-color)]">
                      You completed a task: {activity.task}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-[var(--text-color)]/70">{activity.time}</span>
                      <span className="text-xs text-[var(--text-color)]/70">•</span>
                      <span className="text-xs text-[var(--text-color)]/70">{activity.project}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center py-4">
              <p className="text-sm text-[var(--text-color)]/70">
                That's it. No more history to load.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
