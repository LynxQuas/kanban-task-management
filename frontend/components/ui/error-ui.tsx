type ErrorUiProps = {
    errorText: string;
};

const ErrorUi = ({ errorText }: ErrorUiProps) => {
    return (
        <div className="text-center">
            <h1 className="text-lg font-semibold text-white">
                Something went wrong
            </h1>

            <p className="mt-2 text-sm text-gray-500">{errorText}</p>
        </div>
    );
};

export default ErrorUi;
