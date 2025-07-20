"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Sparkles,
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  FolderOpen,
} from "lucide-react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navigationLinks = [
    {
      name: "Job Applications",
      href: "/app/job-applications",
      icon: FolderOpen,
    },
    { name: "AI Generator", href: "/app/generator", icon: Sparkles },
    { name: "Profile", href: "/app/profile", icon: User },
  ];

  const userMenuItems = [
    { name: "Profile Settings", href: "/settings", icon: Settings },
    { name: "Subscription & Billing", href: "/billing", icon: CreditCard },
    { name: "Logout", href: "/logout", icon: LogOut },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                JobAI Pro
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 ease-in-out"
                  >
                    <IconComponent className="w-4 h-4 mr-2 group-hover:text-blue-600" />
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center max-w-xs bg-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">JD</span>
                  </div>
                  <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-sm text-gray-500">
                        john.doe@example.com
                      </p>
                    </div>
                    <div className="py-1">
                      {userMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                              item.name === "Logout"
                                ? "text-red-700 hover:text-red-900 hover:bg-red-50"
                                : "text-gray-700 hover:text-gray-900"
                            }`}
                          >
                            <IconComponent
                              className={`w-4 h-4 mr-3 ${
                                item.name === "Logout"
                                  ? "text-red-500"
                                  : "text-gray-400"
                              } group-hover:text-current`}
                            />
                            {item.name}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white rounded-lg p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg">
            {/* Mobile Navigation Links */}
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                >
                  <IconComponent className="w-5 h-5 mr-3 group-hover:text-blue-600" />
                  {link.name}
                </a>
              );
            })}

            {/* Mobile User Section */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">JD</span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    John Doe
                  </div>
                  <div className="text-sm text-gray-500">
                    john.doe@example.com
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                {userMenuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        item.name === "Logout"
                          ? "text-red-700 hover:text-red-900 hover:bg-red-50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 mr-3 ${
                          item.name === "Logout"
                            ? "text-red-500"
                            : "text-gray-400"
                        } group-hover:text-current`}
                      />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
