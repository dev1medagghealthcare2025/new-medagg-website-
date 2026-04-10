import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen bg-white flex items-center justify-center px-6'>
      <div className='max-w-lg w-full text-center'>
        <h1 className='text-3xl font-bold text-gray-900 mb-3'>Page not found</h1>
        <p className='text-gray-600 mb-8'>The page you are looking for doesn’t exist.</p>
        <Link
          href='/'
          className='inline-flex items-center justify-center px-6 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors'
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
