import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import DbMonitoringDashboard from "../pages/DbMonitoringDashboard.jsx";
import { PMOverviewDashboard } from "../pages/PMOverviewDashboard.jsx";
import Devices from "../pages/Devices.jsx";
import ReportsPage from "../pages/ReportsPage.jsx";
import Adduser from "../pages/Master/AddUser.jsx";

import RunCmd from "../pages/RunCommand/RunCommand.jsx";
import MultipleRunForm from "../pages/RunCommand/MultipleRunForm.jsx";
import ApplicationUser from "../pages/Master/ApplicationUser.jsx";
import ViewDevices from "../pages/Master/ViewDevices.jsx";
import CustomerMaster from "../pages/Master/CustomerMaster.jsx";
import BranchMaster from "../pages/Master/BranchMaster.jsx";
import GroupMaster from "../pages/Master/GroupMaster.jsx";
import ServerMaster from "../pages/Master/ServerMaster.jsx";
import OEMMaster from "../pages/Master/OEMMaster.jsx";
import SetServerPolicy from "../pages/Master/SetServerPolicy.jsx";
import ScheduleMailReports from "../pages/Master/ScheduleMailReports.jsx";
import MailConfig from "../pages/Master/MailConfig.jsx";
import PeriodicReport from "../pages/Master/PeriodicReport.jsx";

import LinuxDashboard from "../pages/LinuxDashboard.jsx";
import ThirdPartyDashboard from "../pages/ThirdPartyDashboard.jsx";
import SendMultiplePatches from "../pages/contentDistribution/SendMultiplePatches.jsx";

import AutomaticApproval from "../pages/patchSetting/AutomaticApproval.jsx";
import ProductClass from "../pages/patchSetting/ProductClassification.jsx";
import UpdatesSyncSchedule from "../pages/patchSetting/UpdatesSyncSchedule.jsx";
import ClientSyncPolicyMainPage from "../pages/patchSetting/ClientSyncPolicyMainPage.jsx";

import PatchTree from "../pages/PatchTree/PatchTree.jsx";
import PatchTreeUpdateDashboard from "../pages/PatchTree/PatchTreeUpdateDashboard.jsx";
import PatchTreeThirdDashboard from "../pages/PatchTree/PatchTreeThirdDashboard.jsx";
import CriticalUpdates from "../pages/PatchTree/CriticalUpdates.jsx";
import PatchDetails from "../pages/PatchTree/PatchDetails.jsx";
import PatchRepository from "../pages/ThirdPartyPages/PatchRepository.jsx";
import ThirdPartyReport from "../pages/ThirdPartyPages/ThirdPartyReport.jsx";

import MissingApps from "../pages/ThirdPartyPages/MissingApps.jsx";
import InstalledApps from "../pages/ThirdPartyPages/InstalledApps.jsx";
import HostView from "../pages/ThirdPartyPages/HostView.jsx";
import HostDetails from "../pages/ThirdPartyPages/HostDetails.jsx";
import PatchRepositoryNew from "../pages/ThirdPartyPages/PatchRepositoryNew.jsx";
import LatestSoftware from "../pages/ThirdPartyPages/LatestSoftware.jsx";
import PatchStatus from "../pages/ThirdPartyPages/PatchStatus.jsx";
import PatchProgress from "../pages/ThirdPartyPages/PatchProgress.jsx";
import LinuxMissingApp from "../pages/LinuxPages/LinuxMissingApp.jsx";
import LinuxReportsPage from "../pages/LinuxPages/LinuxReportsPage.jsx";
import NetworkPatchDashboard from "../pages/NetworkDevices.jsx/NetworkPatchDashboard.jsx";
import NetworkDeviceDashboard from "../pages/NewNetworkDevices/NetworkDeviceDashboard.jsx";

import PatchDeploymentCenter from "../pages/NetworkDevices.jsx/PatchDeploymentCenter.jsx";
import NetworkMonitoringAlertsDashboard from "../pages/NetworkDevices.jsx/NetworkMonitoringAlertsDashboard.jsx";
import ConfigurationManagerDashboard from "../pages/NetworkDevices.jsx/ConfigurationManagerDashboard.jsx";
import NetworkDeviceConfigurationForm from "../pages/NetworkDevices.jsx/NetworkDeviceConfigurationForm.jsx";
import FirmwareInventoryDashboard from "../pages/NetworkDevices.jsx/FirmwareInventoryDashboard.jsx";
import ConfigurationBackupHistory from "../pages/NetworkDevices.jsx/ConfigurationBackupHistory.jsx";
import NewNetworkMonitoringAlertsDashboard from "../pages/NewNetworkDevices/NetworkMonitoringAlertsDashboard.jsx";
import PatchDeploymentCenterNew from "../pages/NewNetworkDevices/PatchDeploymentCenterNew.jsx";
import NewConfigurationManagerDashboard from "../pages/NewNetworkDevices/NewConfigurationManagerDashboard.jsx";
import NewFirmwareInventoryDashboard from "../pages/NewNetworkDevices/NewFirmwareInventoryDashboard.jsx";
import NewConfigurationBackupHistory from "../pages/NewNetworkDevices/NewConfigurationBackupHistory.jsx";
import DeviceConfigurationForm from "../pages/NewNetworkDevices/DeviceConfigurationForm.jsx";
import LinuxRepository from "../pages/LinuxPages/LinuxRepository.jsx";
import DeviceInventory from "../pages/NewNetworkDevices/DeviceInventory.jsx";
import FirmwareUpgradeUI from "../pages/NetworkDevices.jsx/FirmwareUpgradeUI.jsx";
import EnterpriseFirmwareRepository from "../pages/NetworkDevices.jsx/EnterpriseFirmwareRepository.jsx";
import FirmwareInventory from "../pages/NewNetworkDevices/FirmwareInventory.jsx";
import FirmwareUpgrade from "../pages/NewNetworkDevices/FirmwareUpgrade.jsx";
import ConfigurationForm from "../pages/NewNetworkDevices/ConfigurationForm.jsx";
import NewFirmwareUpgrade from "../pages/NewNetworkDevices/NewFirmwareUpgrade.jsx";
import UpgradeResult from "../pages/NewNetworkDevices/UpgradeResult.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["admin", "DBA"]}>
            <MainLayout />
          </ProtectedRoute>} >

        <Route index
          element={<Navigate to="/dashboard/mainDashboard" replace />} />

        <Route path="/dashboard/mainDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <PMOverviewDashboard />
            </ProtectedRoute>} />

        <Route path="/devices/:username/:ipaddress"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <Devices />
            </ProtectedRoute>} />

        <Route path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ReportsPage />
            </ProtectedRoute>} />

        <Route path="/runcmd"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <RunCmd />
            </ProtectedRoute>} />

        <Route path="/multiple-run"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <MultipleRunForm />
            </ProtectedRoute>} />

        <Route path="/dashboard/linuxDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <LinuxDashboard />
            </ProtectedRoute>} />

        <Route path="/dashboard/thirdPartyApp"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <ThirdPartyDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/master/UserDetails"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <ApplicationUser />
            </ProtectedRoute>
          }
        />

        <Route path="/master/Createuser"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>

              {/* <DbMonitoringDashboard /> */}
              <Adduser />
            </ProtectedRoute>
          }
        />

        <Route path="/master/view-devices"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ViewDevices />
            </ProtectedRoute>
          }
        />

        <Route path="/master/CustomerDetails"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <CustomerMaster />
            </ProtectedRoute>
          } />

        <Route path="/master/Branch"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <BranchMaster />
            </ProtectedRoute>
          } />

        <Route path="/master/Group"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <GroupMaster />
            </ProtectedRoute>
          } />

        <Route path="/master/Server"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ServerMaster />
            </ProtectedRoute>
          } />


        <Route path="/master/OEM"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <OEMMaster />
            </ProtectedRoute>
          } />

        <Route path="/master/setPolicy"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <SetServerPolicy />
            </ProtectedRoute>
          } />

        <Route path="/master/MailReports"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ScheduleMailReports />
            </ProtectedRoute>
          } />

        <Route path="/master/mail-config"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <MailConfig />
            </ProtectedRoute>
          } />

        <Route path="/master/periodic-report"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PeriodicReport />
            </ProtectedRoute>
          } />

        {/* Patch Setting */}
        <Route path="/setting/Auto-Approval"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <AutomaticApproval />
            </ProtectedRoute>} />

        <Route path="/setting/product-class"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ProductClass />
            </ProtectedRoute>} />


        <Route path="/setting/sync-schedule"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <UpdatesSyncSchedule />
            </ProtectedRoute>} />


        <Route path="/setting/client-sync-policy"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ClientSyncPolicyMainPage />
            </ProtectedRoute>} />



        {/* Content Distributin */}
        <Route path="/content/send-multiple"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <SendMultiplePatches />


            </ProtectedRoute>
          } />




        <Route path="/dashboard/patchTree"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchTree />
            </ProtectedRoute>} />

        <Route path="/patchTree/updates"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchTreeUpdateDashboard />
            </ProtectedRoute>} />


        <Route path="/patchTree/ThirdUpdate"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchTreeThirdDashboard />
            </ProtectedRoute>} />

        <Route path="/patchTree/CriticalUpdate"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <CriticalUpdates />
            </ProtectedRoute>} />

        <Route path="/section/Thirdparty"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <PMOverviewDashboard />
            </ProtectedRoute>} />

        <Route path="/patchTree/patchDetails/:srNo"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchDetails />
            </ProtectedRoute>} />

        <Route path="/thirdparty/Missing-Apps"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <MissingApps />
            </ProtectedRoute>} />

        <Route path="/thirdparty/Installed-Apps"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <InstalledApps />
            </ProtectedRoute>} />
        <Route path="/Thirdparty/patch-repository"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchRepository />
            </ProtectedRoute>} />

        <Route path="/Thirdparty/patch-report"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <ThirdPartyReport />
            </ProtectedRoute>} />

        <Route path="/Thirdparty/host-view"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <HostView />
            </ProtectedRoute>} />

        <Route path="/Thirdparty/host-details/:ipAddress"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <HostDetails />
            </ProtectedRoute>} />

        <Route path="/Thirdparty/patch-repo"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchRepositoryNew />
            </ProtectedRoute>} />

        <Route path="/Thirdparty/latest-software"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <LatestSoftware />
            </ProtectedRoute>} />

        <Route path="/thirdparty/Patch_Status"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchStatus />
            </ProtectedRoute>} />


        <Route path="/thirdparty/patch-progress"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchProgress />
            </ProtectedRoute>} />

        <Route path="/section/Linux"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <PMOverviewDashboard />
            </ProtectedRoute>} />

        <Route path="/linux/Missing-Apps"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <LinuxMissingApp />
            </ProtectedRoute>} />

        <Route path="/linux/Missing-Apps"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <LinuxMissingApp />
            </ProtectedRoute>} />

        <Route path="/Linux/Report"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <LinuxReportsPage />
            </ProtectedRoute>} />

        <Route path="/Linux/Repository"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <LinuxRepository />
            </ProtectedRoute>} />

        <Route path="/section/NetDevice"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NetworkPatchDashboard />
            </ProtectedRoute>} />

        <Route path="/section/NeWNetworkDevice"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NetworkDeviceDashboard />
            </ProtectedRoute>} />


        <Route path="/section/PatchDeploymentCenter"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchDeploymentCenter />
            </ProtectedRoute>} />


        <Route path="/section/NetworkMonitoringAlertsDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NetworkMonitoringAlertsDashboard />
            </ProtectedRoute>} />


        <Route path="/section/ConfigurationManagerDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <ConfigurationManagerDashboard />
            </ProtectedRoute>} />

        <Route path="/section/NetworkDeviceConfigurationForm"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NetworkDeviceConfigurationForm />
            </ProtectedRoute>} />
        <Route path="/section/FirmwareInventoryDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <FirmwareInventoryDashboard />
            </ProtectedRoute>} />

        <Route path="/section/ConfigurationBackupHistory"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <ConfigurationBackupHistory />
            </ProtectedRoute>} />


        <Route path="/section/NeWNetworkMonitoringAlert"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NewNetworkMonitoringAlertsDashboard />
            </ProtectedRoute>} />

        <Route path="/section/deplyment-center"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              <PatchDeploymentCenterNew />
            </ProtectedRoute>} />

        <Route path="/section/NewConfigurationManagerDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NewConfigurationManagerDashboard />
            </ProtectedRoute>} />

        <Route path="/section/NewFirmwareInventoryDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NewFirmwareInventoryDashboard />
            </ProtectedRoute>} />

        <Route path="/section/NewConfigurationBackupHistory"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NewConfigurationBackupHistory />
            </ProtectedRoute>} />

        <Route path="/section/NewNetworkDviceConfiguration"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <DeviceConfigurationForm />
            </ProtectedRoute>} />

        <Route path="/section/DeviceInventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <DeviceInventory />
            </ProtectedRoute>} />

        <Route path="/section/FirmwareUpgradeUI"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <FirmwareUpgradeUI />
            </ProtectedRoute>} />

              <Route path="/section/EnterpriseFirmwareRepository"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <EnterpriseFirmwareRepository />
            </ProtectedRoute>} />

             <Route path="/section/FirmwareInvn"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <FirmwareInventory />
               </ProtectedRoute>} />

        <Route path="/section/NewFirmwareUpgrade"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <FirmwareUpgrade />
            </ProtectedRoute>} />

        <Route path="/section/NewConfigForm"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <ConfigurationForm />
            </ProtectedRoute>} />

        <Route path="/section/UgradeFirmware"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <NewFirmwareUpgrade />
            </ProtectedRoute>} />

              <Route path="/section/UpgradeResult"
          element={
            <ProtectedRoute allowedRoles={["admin", "DBA"]}>
              {/* <DbMonitoringDashboard /> */}
              <UpgradeResult />
            </ProtectedRoute>} />


      </Route>
    </Routes >
  );
}
