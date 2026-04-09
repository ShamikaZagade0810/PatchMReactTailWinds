// pages/RoleManagement.jsx
import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Users, 
  Shield, 
  Settings, 
  Edit,
  Copy,
  Trash2,
  Check,
  X,
  Filter,
  ChevronRight
} from "lucide-react";

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Dummy roles data
  const roles = [
    {
      id: 1,
      name: "Dev_Team_a",
      description: "Development team for Project A",
      users: 8,
      permissions: 24,
      environments: ["Dev", "Release Source", "QA"],
      createdBy: "admin@dbmaestro.com",
      createdDate: "2024-01-10"
    },
    {
      id: 2,
      name: "Automation Admin",
      description: "Administrator for automation tasks",
      users: 3,
      permissions: 42,
      environments: ["Dev", "QA", "UAT", "Pre_Prod", "Prod"],
      createdBy: "admin@dbmaestro.com",
      createdDate: "2024-01-09"
    },
    {
      id: 3,
      name: "Global Administrators",
      description: "Full system administrators",
      users: 2,
      permissions: 56,
      environments: ["All"],
      createdBy: "system",
      createdDate: "2024-01-01"
    },
    {
      id: 4,
      name: "Project Developer",
      description: "Standard project developer role",
      users: 15,
      permissions: 18,
      environments: ["Dev", "QA"],
      createdBy: "admin@dbmaestro.com",
      createdDate: "2024-01-08"
    },
    {
      id: 5,
      name: "Project Users",
      description: "Basic project users with view access",
      users: 25,
      permissions: 8,
      environments: ["Dev"],
      createdBy: "projectadmin@company.com",
      createdDate: "2024-01-07"
    },
    {
      id: 6,
      name: "QA Team",
      description: "Quality assurance team role",
      users: 6,
      permissions: 16,
      environments: ["QA", "UAT"],
      createdBy: "admin@dbmaestro.com",
      createdDate: "2024-01-06"
    }
  ];

  const permissions = [
    { id: 1, name: "Admin", category: "Administration" },
    { id: 2, name: "Automation Admin", category: "Administration" },
    { id: 3, name: "Package Creation and Manipulation", category: "Development" },
    { id: 4, name: "Project Admin", category: "Administration" },
    { id: 5, name: "Project Creation", category: "Development" },
    { id: 6, name: "Environment Management", category: "Operations" },
    { id: 7, name: "Policy Management", category: "Security" },
    { id: 8, name: "User Management", category: "Administration" },
    { id: 9, name: "Deployment Execution", category: "Operations" },
    { id: 10, name: "View Reports", category: "Analytics" }
  ];

  const environments = ["Dev", "Release Source", "QA", "UAT", "Pre_Prod", "Prod"];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Role Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage user roles and permissions</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
          <Plus size={20} />
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRole?.id === role.id
                      ? "bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{role.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{role.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {role.users} users
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {role.permissions} perms
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Role Details */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            {selectedRole ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedRole.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{selectedRole.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* General Info */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">General Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Role Name
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedRole.name}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedRole.description}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Environment Access */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Environment Access</h3>
                  <div className="flex flex-wrap gap-2">
                    {environments.map((env) => (
                      <label
                        key={env}
                        className={`inline-flex items-center px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                          selectedRole.environments.includes(env) || selectedRole.environments[0] === "All"
                            ? "bg-cyan-100 border-cyan-300 dark:bg-cyan-900/30 dark:border-cyan-700 text-cyan-800 dark:text-cyan-300"
                            : "bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRole.environments.includes(env) || selectedRole.environments[0] === "All"}
                          className="sr-only"
                          onChange={() => {}}
                        />
                        {env}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Permissions</h3>
                    <button className="text-sm text-cyan-600 hover:text-cyan-700">
                      Select All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {permissions.map((permission) => {
                      const categories = permissions.filter(p => p.category === permission.category);
                      const categoryIndex = categories.findIndex(p => p.id === permission.id);
                      
                      if (categoryIndex === 0) {
                        return (
                          <div key={permission.category}>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {permission.category}
                            </h4>
                            <div className="space-y-2">
                              {categories.map((catPerm) => (
                                <label
                                  key={catPerm.id}
                                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    className="rounded text-cyan-600 focus:ring-cyan-500"
                                    defaultChecked={Math.random() > 0.5}
                                  />
                                  <span className="text-gray-900 dark:text-white">{catPerm.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Select a Role</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose a role from the list to view and edit its details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;