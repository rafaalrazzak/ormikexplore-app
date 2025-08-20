"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminPage() {
     return (
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
               <div className="max-w-4xl mx-auto">
                    <motion.div
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="text-center mb-12"
                    >
                         <h1 className="text-4xl font-bold text-white mb-4">
                              ORMIK Explore Admin Panel
                         </h1>
                         <p className="text-blue-200 text-lg">
                              Manage your application settings and configurations
                         </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {/* Robots.txt Manager */}
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                         >
                              <Link href="/atmint/robots">
                                   <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                                        <div className="text-center">
                                             <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                                                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                  </svg>
                                             </div>
                                             <h3 className="text-xl font-bold text-white mb-2">
                                                  Robots.txt Manager
                                             </h3>
                                             <p className="text-blue-200 text-sm">
                                                  Generate and manage robots.txt file automatically
                                             </p>
                                        </div>
                                   </div>
                              </Link>
                         </motion.div>

                         {/* Sitemap Manager */}
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                         >
                              <Link href="/sitemap.xml">
                                   <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                                        <div className="text-center">
                                             <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                                                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                  </svg>
                                             </div>
                                             <h3 className="text-xl font-bold text-white mb-2">
                                                  Sitemap
                                             </h3>
                                             <p className="text-blue-200 text-sm">
                                                  View auto-generated XML sitemap
                                             </p>
                                        </div>
                                   </div>
                              </Link>
                         </motion.div>

                         {/* Back to Site */}
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                         >
                              <Link href="/">
                                   <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                                        <div className="text-center">
                                             <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                                                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                  </svg>
                                             </div>
                                             <h3 className="text-xl font-bold text-white mb-2">
                                                  Back to Site
                                             </h3>
                                             <p className="text-blue-200 text-sm">
                                                  Return to ORMIK Explore main site
                                             </p>
                                        </div>
                                   </div>
                              </Link>
                         </motion.div>
                    </div>

                    {/* Footer */}
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.5 }}
                         className="text-center mt-12"
                    >
                         <p className="text-blue-300 text-sm">
                              ORMIK Explore 2025 Admin Panel - Built with Next.js
                         </p>
                    </motion.div>
               </div>
          </div>
     );
}
