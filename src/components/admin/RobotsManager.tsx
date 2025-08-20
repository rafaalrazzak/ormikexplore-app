"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RobotsStats {
     totalLines: number;
     userAgents: number;
     allowRules: number;
     disallowRules: number;
     hasSitemap: boolean;
     hasHost: boolean;
}

interface RobotsValidation {
     isValid: boolean;
     errors: string[];
     warnings: string[];
}

export default function RobotsManager() {
     const [robotsContent, setRobotsContent] = useState<string>('');
     const [isLoading, setIsLoading] = useState(false);
     const [stats, setStats] = useState<RobotsStats | null>(null);
     const [validation, setValidation] = useState<RobotsValidation | null>(null);
     const [lastGenerated, setLastGenerated] = useState<string>('');

     // Fetch current robots.txt content
     const fetchRobotsContent = async () => {
          setIsLoading(true);
          try {
               const response = await fetch('/robots.txt');
               const content = await response.text();
               setRobotsContent(content);

               // Get generation timestamp from headers
               const generatedAt = response.headers.get('X-Generated-At');
               if (generatedAt) {
                    setLastGenerated(new Date(generatedAt).toLocaleString());
               }
          } catch (error) {
               console.error('Error fetching robots.txt:', error);
          } finally {
               setIsLoading(false);
          }
     };

     // Regenerate robots.txt
     const regenerateRobots = async () => {
          setIsLoading(true);
          try {
               const response = await fetch('/robots.txt', {
                    cache: 'no-cache',
                    headers: {
                         'Cache-Control': 'no-cache'
                    }
               });
               const content = await response.text();
               setRobotsContent(content);

               const generatedAt = response.headers.get('X-Generated-At');
               if (generatedAt) {
                    setLastGenerated(new Date(generatedAt).toLocaleString());
               }
          } catch (error) {
               console.error('Error regenerating robots.txt:', error);
          } finally {
               setIsLoading(false);
          }
     };

     // Validate robots.txt content
     const validateContent = async (content: string) => {
          try {
               const response = await fetch('/api/robots/validate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content })
               });
               const result = await response.json();
               setValidation(result.validation);
               setStats(result.stats);
          } catch (error) {
               console.error('Error validating robots.txt:', error);
          }
     };

     // Test robots.txt URL
     // const testUrl = async (url: string) => {
     //      try {
     //           const response = await fetch('/api/robots/test', {
     //                method: 'POST',
     //                headers: { 'Content-Type': 'application/json' },
     //                body: JSON.stringify({ url, content: robotsContent })
     //           });
     //           const result = await response.json();
     //           return result;
     //      } catch (error) {
     //           console.error('Error testing URL:', error);
     //           return null;
     //      }
     // };

     useEffect(() => {
          fetchRobotsContent();
     }, []);

     useEffect(() => {
          if (robotsContent) {
               validateContent(robotsContent);
          }
     }, [robotsContent]);

     return (
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
               <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-center mb-8"
                    >
                         <h1 className="text-4xl font-bold text-white mb-2">
                              Robots.txt Manager
                         </h1>
                         <p className="text-blue-200">
                              ORMIK Explore 2025 - Automatic Robots.txt Generation
                         </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         {/* Left Column - Content & Controls */}
                         <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="space-y-6"
                         >
                              {/* Control Panel */}
                              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                   <h2 className="text-xl font-bold text-white mb-4">Controls</h2>
                                   <div className="flex flex-wrap gap-3">
                                        <button
                                             onClick={fetchRobotsContent}
                                             disabled={isLoading}
                                             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                        >
                                             {isLoading ? 'Loading...' : 'Refresh'}
                                        </button>
                                        <button
                                             onClick={regenerateRobots}
                                             disabled={isLoading}
                                             className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                        >
                                             Regenerate
                                        </button>
                                        <a
                                             href="/robots.txt"
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                        >
                                             View Live
                                        </a>
                                   </div>
                                   {lastGenerated && (
                                        <p className="text-blue-200 text-sm mt-3">
                                             Last generated: {lastGenerated}
                                        </p>
                                   )}
                              </div>

                              {/* Robots.txt Content */}
                              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                   <h2 className="text-xl font-bold text-white mb-4">
                                        Current Robots.txt Content
                                   </h2>
                                   <div className="bg-black/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                                        <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
                                             {robotsContent || 'Loading...'}
                                        </pre>
                                   </div>
                              </div>
                         </motion.div>

                         {/* Right Column - Stats & Validation */}
                         <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="space-y-6"
                         >
                              {/* Statistics */}
                              {stats && (
                                   <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                        <h2 className="text-xl font-bold text-white mb-4">Statistics</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                             <div className="text-center">
                                                  <div className="text-2xl font-bold text-yellow-400">
                                                       {stats.totalLines}
                                                  </div>
                                                  <div className="text-blue-200 text-sm">Total Lines</div>
                                             </div>
                                             <div className="text-center">
                                                  <div className="text-2xl font-bold text-green-400">
                                                       {stats.userAgents}
                                                  </div>
                                                  <div className="text-blue-200 text-sm">User Agents</div>
                                             </div>
                                             <div className="text-center">
                                                  <div className="text-2xl font-bold text-blue-400">
                                                       {stats.allowRules}
                                                  </div>
                                                  <div className="text-blue-200 text-sm">Allow Rules</div>
                                             </div>
                                             <div className="text-center">
                                                  <div className="text-2xl font-bold text-red-400">
                                                       {stats.disallowRules}
                                                  </div>
                                                  <div className="text-blue-200 text-sm">Disallow Rules</div>
                                             </div>
                                        </div>
                                        <div className="mt-4 flex justify-center space-x-6">
                                             <div className="flex items-center">
                                                  <div className={`w-3 h-3 rounded-full mr-2 ${stats.hasSitemap ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                                  <span className="text-white text-sm">Sitemap</span>
                                             </div>
                                             <div className="flex items-center">
                                                  <div className={`w-3 h-3 rounded-full mr-2 ${stats.hasHost ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                                  <span className="text-white text-sm">Host</span>
                                             </div>
                                        </div>
                                   </div>
                              )}

                              {/* Validation Results */}
                              {validation && (
                                   <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                        <h2 className="text-xl font-bold text-white mb-4">Validation</h2>

                                        <div className={`flex items-center mb-4 ${validation.isValid ? 'text-green-400' : 'text-red-400'}`}>
                                             <div className={`w-4 h-4 rounded-full mr-3 ${validation.isValid ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                             <span className="font-medium">
                                                  {validation.isValid ? 'Valid' : 'Invalid'}
                                             </span>
                                        </div>

                                        {validation.errors.length > 0 && (
                                             <div className="mb-4">
                                                  <h3 className="text-red-400 font-medium mb-2">Errors:</h3>
                                                  <ul className="space-y-1">
                                                       {validation.errors.map((error, index) => (
                                                            <li key={index} className="text-red-300 text-sm">
                                                                 • {error}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        )}

                                        {validation.warnings.length > 0 && (
                                             <div>
                                                  <h3 className="text-yellow-400 font-medium mb-2">Warnings:</h3>
                                                  <ul className="space-y-1">
                                                       {validation.warnings.map((warning, index) => (
                                                            <li key={index} className="text-yellow-300 text-sm">
                                                                 • {warning}
                                                            </li>
                                                       ))}
                                                  </ul>
                                             </div>
                                        )}
                                   </div>
                              )}

                              {/* Environment Info */}
                              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                   <h2 className="text-xl font-bold text-white mb-4">Environment</h2>
                                   <div className="space-y-2">
                                        <div className="flex justify-between">
                                             <span className="text-blue-200">Mode:</span>
                                             <span className="text-white font-medium">
                                                  {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
                                             </span>
                                        </div>
                                        <div className="flex justify-between">
                                             <span className="text-blue-200">Domain:</span>
                                             <span className="text-white font-medium">
                                                  {typeof window !== 'undefined' ? window.location.origin : 'N/A'}
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         </motion.div>
                    </div>
               </div>
          </div>
     );
}
