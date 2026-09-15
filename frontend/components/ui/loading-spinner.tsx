const LoadingSpinner = () => {
    return (
        <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-indigo-500" />

            <p className="text-sm text-gray-500">Loading your boards...</p>
        </div>
    );
};

export default LoadingSpinner;
