import HeaderClient from '../HeaderClient';

export default function BlogLayout({ children }) {
  return (
    <>
      <HeaderClient />
      {children}
    </>
  );
}
