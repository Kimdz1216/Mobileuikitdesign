import { RouterProvider } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <div
        className="size-full flex items-center justify-center"
        style={{ backgroundColor: '#E8E8E8' }}
      >
        {/* Android phone frame – 412px wide, centered on desktop */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '100%',
            maxWidth: 412,
            height: '100%',
            backgroundColor: '#F7F8FA',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 8px 48px rgba(0,0,0,0.18)',
          }}
        >
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}
