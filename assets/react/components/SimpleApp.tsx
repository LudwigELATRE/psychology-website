import React from 'react';

const SimpleApp: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Psychology Website
                    </h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Bienvenue sur votre site de psychologie
                                </h2>
                                <p className="text-gray-600">
                                    L'application React avec TypeScript fonctionne !
                                </p>
                                <div className="mt-6 space-y-2">
                                    <p className="text-sm text-gray-500">
                                        ✅ React + TypeScript configuré
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ✅ Tailwind CSS fonctionnel
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ✅ Webpack Encore opérationnel
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ✅ API Platform prêt
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SimpleApp;