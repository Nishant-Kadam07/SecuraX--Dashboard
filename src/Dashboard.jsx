  import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  FiMoon,
  FiSettings,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiEye,
  FiWifi,
  FiPackage,
  FiHome,
} from 'react-icons/fi';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Visibility');
  const [timeframe, setTimeframe] = useState('Weekly');

  // Traffic Overview Data
  const trafficData = [
    { month: 'Jan', value: 2000 },
    { month: 'Feb', value: 2200 },
    { month: 'Mar', value: 2100 },
    { month: 'Apr', value: 2456 },
    { month: 'May', value: 2300 },
    { month: 'Jun', value: 2400 },
    { month: 'Jul', value: 2350 },
    { month: 'Aug', value: 2500 },
    { month: 'Sep', value: 2600 },
    { month: 'Oct', value: 2450 },
    { month: 'Nov', value: 2550 },
    { month: 'Dec', value: 2700 },
  ];

  // Top Active Ports Data
  const portsData = [
    { port: '28', value: 400 },
    { port: '32', value: 300 },
    { port: '36', value: 200 },
    { port: '42', value: 278 },
    { port: '56', value: 190 },
    { port: '68', value: 239 },
    { port: '72', value: 221 },
    { port: '85', value: 250 },
    { port: '92', value: 210 },
  ];

  // Active Devices Data
  const devicesData = [
    {
      id: 1,
      assetName: 'DNS: ISC Bind RPZ Rule Process…',
      severity: 'Minor',
      status: '118 Alerts / 225 Alerts',
      lastActive: '2025-01-12 / 2025-01-22',
      detected: '2025-02-12 / 2025-02-19',
      assets: '235 / 356',
    },
    {
      id: 2,
      assetName: 'DNS: ISC Bind RPZ Rule Process…',
      severity: 'Minor',
      status: '118 Alerts / 225 Alerts',
      lastActive: '2025-01-12 / 2025-01-22',
      detected: '2025-02-12 / 2025-02-19',
      assets: '235 / 356',
    },
    {
      id: 3,
      assetName: 'DNS: ISC Bind RPZ Rule Process…',
      severity: 'Minor',
      status: '118 Alerts / 225 Alerts',
      lastActive: '2025-01-12 / 2025-01-22',
      detected: '2025-02-12 / 2025-02-19',
      assets: '235 / 356',
    },
    {
      id: 4,
      assetName: 'DNS: ISC Bind RPZ Rule Process…',
      severity: 'Minor',
      status: '118 Alerts / 225 Alerts',
      lastActive: '2025-01-12 / 2025-01-22',
      detected: '2025-02-12 / 2025-02-19',
      assets: '235 / 356',
    },
  ];

  const StatCard = ({ title, value, change }) => {
    const isPositive = change.startsWith('+');
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50">
        <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
        <p className="text-3xl font-bold text-white mb-2">{value}</p>
        <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </p>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 rounded p-3 text-white text-sm">
          <p className="font-semibold">${payload[0].value}</p>
          <p className="text-green-400">+3.45% (+0.058)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveMenu('Dashboard')}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center hover:from-slate-600 hover:to-slate-700 transition-colors"
            >
              <FiHome className="text-white font-bold text-lg" size={20} />
            </button>

            {/* Search */}
            <div className="relative hidden lg:block">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Searching for:', searchQuery);
                  }
                }}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Menu Items */}
            <div className="hidden lg:flex gap-8">
              {[
                { name: 'Dashboard', icon: FiHome },
                { name: 'Visibility', icon: FiEye },
                { name: 'Network', icon: FiWifi },
                { name: 'Assets', icon: FiPackage }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors pb-1 ${
                      item.name === activeMenu
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right - Icons & Profile */}
          <div className="flex items-center gap-6">
            {/* Icons */}
            <div className="flex gap-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded transition-colors"
                title="Toggle Dark Mode"
              >
                <FiMoon size={20} />
              </button>
              <button 
                onClick={() => alert('Settings panel opened')}
                className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded transition-colors"
                title="Settings"
              >
                <FiSettings size={20} />
              </button>
              <button 
                onClick={() => alert('Notifications panel opened')}
                className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded transition-colors"
                title="Notifications"
              >
                <FiBell size={20} />
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
              <div>
                <p className="text-sm font-medium text-white">Alex Rock</p>
                <p className="text-xs text-slate-400">Product Designer</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border border-slate-600"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-6">
        {/* TOP STATS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard title="Domain Controller" value="12,585" change="+0.30%" />
          <StatCard title="NTP Server" value="12,585" change="-0.44%" />
          <StatCard title="Web Server" value="12,585" change="+0.70%" />
          <StatCard title="Other" value="12,585" change="-0.69%" />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Traffic Overview */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Traffic Overview</h2>
              <button 
                onClick={() => {
                  const options = ['Daily', 'Weekly', 'Monthly'];
                  const currentIndex = options.indexOf(timeframe);
                  const nextIndex = (currentIndex + 1) % options.length;
                  setTimeframe(options[nextIndex]);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white hover:bg-slate-700 transition-colors"
              >
                {timeframe}
                <FiChevronDown size={16} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Active Ports */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-6">Top Active Ports</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={portsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="port" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Bar dataKey="value" fill="#6366f1" opacity={0.8} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ACTIVE DEVICES TABLE */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 backdrop-blur-md border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">2163 Active Devices</h2>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search identities"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Searching identities for:', tableSearch);
                  }
                }}
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                    Asset Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                    Severity Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                    Last Active
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                    Time Detected (UTC)
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                    Assets
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {devicesData.map((device, index) => (
                  <tr
                    key={device.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {device.assetName}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
                        {device.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {device.status}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {device.lastActive}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {device.detected}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {device.assets}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button 
                        onClick={() => alert(`Viewing device: ${device.assetName}`)}
                        className="px-3 py-1 rounded bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
