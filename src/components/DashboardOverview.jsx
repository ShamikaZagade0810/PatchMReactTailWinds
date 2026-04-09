import React from "react";
import {
  Database,
  Server,
  Package,
  Shield,
  GitCompare,
  Code2,
  ListOrdered,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ArrowRightLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardOverview = ({ projects, environments, packages }) => {
  const navigate = useNavigate();
  
  const stats = [
    {
      title: "Total Projects",
      value: projects?.length || 0,
      icon: Database,
      color: "text-blue-600",
      description: "Active database projects"
    },
    {
      title: "Environments",
      value: environments?.length || 0,
      icon: Server,
      color: "text-green-600",
      description: "Deployment environments"
    },
    {
      title: "Pending Changes",
      value: packages?.filter(p => p.status === "pending" || p.status === "assigned")?.length || 0,
      icon: Package,
      color: "text-amber-600",
      description: "Changes awaiting deployment"
    },
    {
      title: "Policy Violations",
      value: 12,
      icon: AlertTriangle,
      color: "text-red-600",
      description: "Security policy issues"
    }
  ];

  const quickActions = [
    {
      title: "Multi-Format Changes",
      description: "Define changes in SQL, XML, YAML, JSON",
      icon: Code2,
      color: "bg-blue-500",
      onClick: () => navigate("/projects/1?tab=changes")
    },
    {
      title: "Change Orchestration",
      description: "Manage dependencies and execution order",
      icon: ListOrdered,
      color: "bg-purple-500",
      onClick: () => navigate("/projects/1?tab=changelog")
    },
    {
      title: "Security Checks",
      description: "Run automated policy validation",
      icon: Shield,
      color: "bg-green-500",
      onClick: () => navigate("/projects/1?tab=security")
    },
    {
      title: "Drift Detection",
      description: "Find unauthorized changes",
      icon: GitCompare,
      color: "bg-orange-500",
      onClick: () => navigate("/projects/1?tab=drift")
    },
    {
      title: "Auto-Rollback",
      description: "Undo changes automatically",
      icon: RefreshCw,
      color: "bg-red-500",
      onClick: () => alert("Auto-rollback feature")
    },
    {
      title: "Cross-DB Portability",
      description: "Support multiple databases",
      icon: ArrowRightLeft,
      color: "bg-cyan-500",
      onClick: () => alert("Cross-database features")
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {stat.title}
                  </div>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {stat.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          DevSecOps Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-cyan-300 dark:hover:border-cyan-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${action.color} bg-opacity-10`}>
                    <Icon className={`w-5 h-5 ${action.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {action.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            { id: 1, action: "Schema change deployed", project: "POC_MYSQL", time: "2 hours ago", icon: CheckCircle, color: "text-green-500" },
            { id: 2, action: "Drift detected", project: "MSqilPyTask6", time: "4 hours ago", icon: AlertTriangle, color: "text-orange-500" },
            { id: 3, action: "Policy check failed", project: "CRM_DB", time: "1 day ago", icon: Shield, color: "text-red-500" },
            { id: 4, action: "Auto-rollback executed", project: "ERP_System", time: "2 days ago", icon: RefreshCw, color: "text-purple-500" },
          ].map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                <Icon className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <div className="text-sm text-gray-900 dark:text-white">{activity.action}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{activity.project}</div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;