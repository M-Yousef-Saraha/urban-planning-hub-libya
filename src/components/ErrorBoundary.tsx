import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // You can send error details to a logging service here
    // console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50" dir="rtl">
          <div className="max-w-xl w-full bg-white shadow rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">حدث خطأ ما</h2>
            <p className="text-gray-600 mb-6">تَعَرَّض التطبيق لخطأ غير متوقع. يرجى إعادة تحميل الصفحة أو المحاولة لاحقًا.</p>
            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={() => window.location.reload()}
              >
                إعادة تحميل
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
